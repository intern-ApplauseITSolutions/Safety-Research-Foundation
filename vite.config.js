import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.GIF', '**/*.PDF', '**/*.pdf'],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost/srf',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err.message);
            console.log('Request URL:', req.url);
            console.log('Request method:', req.method);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending request to target:', req.method, req.url);
            console.log('Headers being sent:', req.headers);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response from target:', proxyRes.statusCode, req.url);
            console.log('Response headers:', proxyRes.headers);
          });
        }
      }
    }
  }
})

