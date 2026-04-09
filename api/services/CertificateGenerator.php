<?php
/**
 * PDF Certificate Generator Service
 * Safety Research Foundation
 */

require_once __DIR__ . '/../config/database.php';

class CertificateGenerator {
    private $db;
    private $uploadDir;
    private $templatePath;

    public function __construct($db = null) {
        if ($db instanceof PDO) {
            $this->db = $db;
        } else {
            $database = new Database();
            $this->db = $database->getConnection();
        }

        $this->uploadDir = __DIR__ . '/../../uploads/certificates/';
        $this->templatePath = __DIR__ . '/../../src/assets/images/Road Safety Pledge.png';

        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }

    /**
     * Generate PDF certificate for pledge submission.
     */
    public function generateCertificate($submissionId) {
        try {
            $query = "SELECT ps.*, pc.title as pledge_title, pc.year, pc.sample_certificate_url
                      FROM pledge_submissions ps
                      LEFT JOIN pledge_configs pc ON ps.config_id = pc.id
                      WHERE ps.id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $submissionId);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                throw new Exception('Submission not found');
            }

            if (!file_exists($this->templatePath)) {
                throw new Exception('Certificate template image not found');
            }

            $submission = $stmt->fetch(PDO::FETCH_ASSOC);
            $pdfContent = $this->createCertificatePdf($submission);

            $filename = 'certificate_' . $submissionId . '_' . time() . '.pdf';
            $filepath = $this->uploadDir . $filename;

            file_put_contents($filepath, $pdfContent);

            $updateQuery = "UPDATE pledge_submissions SET certificate_path = :certificate_path WHERE id = :id";
            $updateStmt = $this->db->prepare($updateQuery);
            $updateStmt->bindParam(':certificate_path', $filename);
            $updateStmt->bindParam(':id', $submissionId);
            $updateStmt->execute();

            return [
                'success' => true,
                'filename' => $filename,
                'filepath' => $filepath,
                'url' => $this->buildCertificateUrl($filename)
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    private function createCertificatePdf($submission) {
        $png = $this->readPngTemplate($this->templatePath);
        $pageWidth = 842;
        $pageHeight = 595;
        $certificateName = $this->formatCertificateName($submission);
        $fontSize = $this->fitFontSize($certificateName, 26, 16, 520);
        $textWidth = $this->estimateTextWidth($certificateName, $fontSize);

        $nameCenterX = 474.5;
        $textX = max(40, $nameCenterX - ($textWidth / 2));
        $textY = 274;

        $content = array();
        $content[] = 'q';
        $content[] = sprintf('%.3F 0 0 %.3F 0 0 cm', $pageWidth, $pageHeight);
        $content[] = '/Im1 Do';
        $content[] = 'Q';
        $content[] = 'BT';
        $content[] = '/F1 ' . $this->formatNumber($fontSize) . ' Tf';
        $content[] = '0 g';
        $content[] = sprintf('1 0 0 1 %.3F %.3F Tm', $textX, $textY);
        $content[] = '(' . $this->escapePdfText($certificateName) . ') Tj';
        $content[] = 'ET';
        $contentStream = implode("\n", $content) . "\n";

        return $this->buildPdfDocument($png, $contentStream, $pageWidth, $pageHeight);
    }

    private function formatCertificateName($submission) {
        $title = trim((string) ($submission['title'] ?? ''));
        $name = trim((string) ($submission['name'] ?? ''));
        $fullName = trim($title . ' ' . $name);

        if ($fullName === '') {
            $fullName = 'Participant';
        }

        return preg_replace('/\s+/', ' ', $fullName);
    }

    private function fitFontSize($text, $initialSize, $minimumSize, $maxWidth) {
        $fontSize = $initialSize;

        while ($fontSize > $minimumSize && $this->estimateTextWidth($text, $fontSize) > $maxWidth) {
            $fontSize -= 1;
        }

        return $fontSize;
    }

    private function estimateTextWidth($text, $fontSize) {
        $width = 0;
        $characters = preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY);

        foreach ($characters as $character) {
            if (preg_match('/[A-Z]/', $character)) {
                $width += 0.74;
            } elseif (preg_match('/[a-z]/', $character)) {
                $width += 0.54;
            } elseif (preg_match('/[0-9]/', $character)) {
                $width += 0.55;
            } elseif ($character === ' ') {
                $width += 0.28;
            } elseif (in_array($character, array('.', ','), true)) {
                $width += 0.24;
            } else {
                $width += 0.5;
            }
        }

        return $width * $fontSize;
    }

    private function readPngTemplate($filePath) {
        $handle = fopen($filePath, 'rb');

        if ($handle === false) {
            throw new Exception('Unable to open certificate template');
        }

        $signature = fread($handle, 8);
        if ($signature !== "\x89PNG\x0D\x0A\x1A\x0A") {
            fclose($handle);
            throw new Exception('Certificate template must be a PNG image');
        }

        $width = 0;
        $height = 0;
        $bitDepth = 0;
        $colorType = 0;
        $palette = '';
        $transparency = '';
        $imageData = '';

        while (!feof($handle)) {
            $lengthBytes = fread($handle, 4);
            if (strlen($lengthBytes) !== 4) {
                break;
            }

            $length = unpack('N', $lengthBytes)[1];
            $chunkType = fread($handle, 4);
            $chunkData = $length > 0 ? fread($handle, $length) : '';
            fread($handle, 4);

            if ($chunkType === 'IHDR') {
                $header = unpack('Nwidth/Nheight/CbitDepth/CcolorType/Ccompression/Cfilter/Cinterlace', $chunkData);
                $width = $header['width'];
                $height = $header['height'];
                $bitDepth = $header['bitDepth'];
                $colorType = $header['colorType'];
            } elseif ($chunkType === 'PLTE') {
                $palette = $chunkData;
            } elseif ($chunkType === 'tRNS') {
                $transparency = $chunkData;
            } elseif ($chunkType === 'IDAT') {
                $imageData .= $chunkData;
            } elseif ($chunkType === 'IEND') {
                break;
            }
        }

        fclose($handle);

        if ($width === 0 || $height === 0 || $imageData === '') {
            throw new Exception('Certificate template PNG is invalid');
        }

        $colorSpace = '';
        if ($colorType === 0 || $colorType === 4) {
            $colorSpace = '/DeviceGray';
        } elseif ($colorType === 2 || $colorType === 6) {
            $colorSpace = '/DeviceRGB';
        } elseif ($colorType === 3) {
            $colorSpace = '/Indexed /DeviceRGB ' . ((strlen($palette) / 3) - 1) . ' 9 0 R';
        } else {
            throw new Exception('Unsupported PNG color type in certificate template');
        }

        if ($colorType >= 4) {
            throw new Exception('Certificate template PNG cannot contain alpha transparency');
        }

        return array(
            'width' => $width,
            'height' => $height,
            'bit_depth' => $bitDepth,
            'color_type' => $colorType,
            'color_space' => $colorSpace,
            'palette' => $palette,
            'transparency' => $transparency,
            'data' => $imageData,
            'decode_params' => '/Predictor 15 /Colors ' . $this->getColorCount($colorType) . ' /BitsPerComponent ' . $bitDepth . ' /Columns ' . $width
        );
    }

    private function getColorCount($colorType) {
        if ($colorType === 0) {
            return 1;
        }

        if ($colorType === 2) {
            return 3;
        }

        if ($colorType === 3) {
            return 1;
        }

        throw new Exception('Unsupported PNG color type');
    }

    private function buildPdfDocument($png, $contentStream, $pageWidth, $pageHeight) {
        $objects = array();
        $offsets = array();
        $pdf = "%PDF-1.4\n";

        $objects[] = '<< /Type /Catalog /Pages 2 0 R >>';
        $objects[] = '<< /Type /Pages /Count 1 /Kids [3 0 R] >>';
        $objects[] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' . $this->formatNumber($pageWidth) . ' ' . $this->formatNumber($pageHeight) . '] /Resources << /Font << /F1 4 0 R >> /XObject << /Im1 5 0 R >> >> /Contents 6 0 R >>';
        $objects[] = '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>';

        $imageObject = '<< /Type /XObject /Subtype /Image /Width ' . $png['width'] . ' /Height ' . $png['height'] . ' /ColorSpace ' . $png['color_space'] . ' /BitsPerComponent ' . $png['bit_depth'] . ' /Filter /FlateDecode /DecodeParms << ' . $png['decode_params'] . ' >> /Length ' . strlen($png['data']);

        if ($png['color_type'] === 3 && $png['palette'] !== '') {
            $imageObject .= ' /Mask ' . $this->buildIndexedTransparencyMask($png['transparency']);
        } elseif ($png['transparency'] !== '' && ($png['color_type'] === 0 || $png['color_type'] === 2)) {
            $imageObject .= ' /Mask ' . $this->buildColorTransparencyMask($png['transparency'], $png['color_type']);
        }

        $imageObject .= " >>\nstream\n" . $png['data'] . "\nendstream";
        $objects[] = $imageObject;
        $objects[] = '<< /Length ' . strlen($contentStream) . " >>\nstream\n" . $contentStream . "endstream";

        if ($png['color_type'] === 3 && $png['palette'] !== '') {
            $objects[] = '<< /Length ' . strlen($png['palette']) . " >>\nstream\n" . $png['palette'] . "\nendstream";
        }

        foreach ($objects as $index => $object) {
            $objectNumber = $index + 1;
            $offsets[$objectNumber] = strlen($pdf);
            $pdf .= $objectNumber . " 0 obj\n" . $object . "\nendobj\n";
        }

        $xrefPosition = strlen($pdf);
        $pdf .= "xref\n0 " . (count($objects) + 1) . "\n";
        $pdf .= "0000000000 65535 f \n";

        for ($i = 1; $i <= count($objects); $i++) {
            $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
        }

        $pdf .= 'trailer' . "\n<< /Size " . (count($objects) + 1) . " /Root 1 0 R >>\n";
        $pdf .= "startxref\n" . $xrefPosition . "\n%%EOF";

        return $pdf;
    }

    private function buildIndexedTransparencyMask($transparency) {
        if ($transparency === '') {
            return '[0 0]';
        }

        $values = unpack('C*', $transparency);
        $transparentIndex = null;

        foreach ($values as $index => $value) {
            if ($value === 0) {
                $transparentIndex = $index - 1;
                break;
            }
        }

        if ($transparentIndex === null) {
            return '[0 0]';
        }

        return '[' . $transparentIndex . ' ' . $transparentIndex . ']';
    }

    private function buildColorTransparencyMask($transparency, $colorType) {
        if ($colorType === 0 && strlen($transparency) >= 2) {
            $gray = unpack('n', $transparency)[1];
            return '[' . $gray . ' ' . $gray . ']';
        }

        if ($colorType === 2 && strlen($transparency) >= 6) {
            $values = unpack('nred/ngreen/nblue', $transparency);
            return '[' . $values['red'] . ' ' . $values['red'] . ' ' . $values['green'] . ' ' . $values['green'] . ' ' . $values['blue'] . ' ' . $values['blue'] . ']';
        }

        return '[0 0]';
    }

    private function escapePdfText($text) {
        $text = preg_replace('/[^\x20-\x7E]/', '', (string) $text);
        return str_replace(array('\\', '(', ')'), array('\\\\', '\\(', '\\)'), $text);
    }

    private function formatNumber($number) {
        $formatted = number_format((float) $number, 3, '.', '');
        return rtrim(rtrim($formatted, '0'), '.');
    }

    private function buildCertificateUrl($filename) {
        return $this->buildPublicBaseUrl() . '/uploads/certificates/' . $filename;
    }

    private function buildPublicBaseUrl() {
        $basePath = '';
        if (!empty($_SERVER['SCRIPT_NAME'])) {
            $basePath = dirname(dirname(dirname($_SERVER['SCRIPT_NAME'])));
            if ($basePath === '\\' || $basePath === '/') {
                $basePath = '';
            }
        }

        $basePath = str_replace('\\', '/', $basePath);

        if (empty($_SERVER['HTTP_HOST'])) {
            return rtrim($basePath, '/');
        }

        $scheme = 'http';
        if (
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
            (!empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] === 'https') ||
            (!empty($_SERVER['SERVER_PORT']) && (string) $_SERVER['SERVER_PORT'] === '443')
        ) {
            $scheme = 'https';
        }

        return $scheme . '://' . $_SERVER['HTTP_HOST'] . rtrim($basePath, '/');
    }
}
?>
