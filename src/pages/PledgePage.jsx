import React, { useState, useEffect } from 'react';
import { Shield, Share2, PenTool, Users, Calendar, Award, Heart, CheckCircle, Copy, Facebook, Twitter, Linkedin, X, Mail, FileText, Download, AlertCircle } from 'lucide-react';
import { pledgeService } from '../services/pledgeService';

const PledgePage = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPledgeForm, setShowPledgeForm] = useState(false);
  const [pledgeStep, setPledgeStep] = useState(1); // 1: Initial, 2: Details, 3: Language, 4: Read Pledge, 5: OTP
  const [pledgeData, setPledgeData] = useState({
    title: '',
    name: '',
    gender: '',
    dob: '',
    pincode: '',
    state: '',
    district: '',
    email: '',
    mobile: '',
    language: ''
  });
  const [pledgeConfig, setPledgeConfig] = useState(null);
  const [pledgeContent, setPledgeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [otp, setOtp] = useState('');
  const [showExistingCertificateForm, setShowExistingCertificateForm] = useState(false);
  const [existingPledgeEmail, setExistingPledgeEmail] = useState('');
  const [existingCertificateOtp, setExistingCertificateOtp] = useState('');
  const [existingCertificateOtpSent, setExistingCertificateOtpSent] = useState(false);
  const [existingCertificateLoading, setExistingCertificateLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch pledge data
  useEffect(() => {
    const fetchPledgeData = async () => {
      try {
        setLoading(true);
        const data = await pledgeService.getPledgeData();
        setPledgeConfig(data.config);
        setPledgeContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPledgeData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPledgeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showStatus = (type, message) => {
    setStatusMessage({ type, message });
    if (window.__pledgeStatusTimer) {
      window.clearTimeout(window.__pledgeStatusTimer);
    }
    window.__pledgeStatusTimer = window.setTimeout(() => {
      setStatusMessage(null);
    }, 3000);
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setSuccessDetails(null);
  };

  const handleExistingCertificateRequest = async (action) => {
    const email = existingPledgeEmail.trim();

    if (!email) {
      showStatus('error', 'Enter your registered email address.');
      return;
    }

    const otp = existingCertificateOtp.replace(/\D/g, '').trim();
    if (otp.length !== 6) {
      showStatus('error', 'Enter the 6-digit OTP sent to your registered email.');
      return;
    }

    try {
      setExistingCertificateLoading(true);
      const result = await pledgeService.getExistingCertificate({
        email,
        otp,
        configId: pledgeConfig?.id,
        action
      });

      if (action === 'send_email') {
        showStatus('success', `Certificate sent to ${result.email}.`);
      } else if (result.certificate_url) {
        window.open(result.certificate_url, '_blank', 'noopener,noreferrer');
        showStatus('success', 'Certificate download opened.');
      }
    } catch (error) {
      showStatus('error', error.message);
    } finally {
      setExistingCertificateLoading(false);
    }
  };

  const handleSendExistingCertificateOtp = async () => {
    const email = existingPledgeEmail.trim();

    if (!email) {
      showStatus('error', 'Enter your registered email address.');
      return;
    }

    try {
      setExistingCertificateLoading(true);
      await pledgeService.sendExistingCertificateOTP({
        email,
        configId: pledgeConfig?.id
      });
      setExistingCertificateOtp('');
      setExistingCertificateOtpSent(true);
      showStatus('success', `OTP sent to ${email}.`);
    } catch (error) {
      showStatus('error', error.message);
    } finally {
      setExistingCertificateLoading(false);
    }
  };

  const handlePledgeSubmit = async (e) => {
    e.preventDefault();
    
    if (pledgeStep < 5) {
      setPledgeStep(prev => prev + 1);
      
      // When reaching OTP step, send OTP
      if (pledgeStep === 4) {
        try {
          setLoading(true);
          await pledgeService.sendOTP(pledgeData.email, pledgeData.name, pledgeData.mobile);
          showStatus('success', 'OTP sent to your email address.');
          setLoading(false);
        } catch (error) {
          setLoading(false);
          showStatus('error', 'Error sending OTP: ' + error.message);
          return;
        }
      }
    } else {
      // Final submission with OTP verification
      try {
        setLoading(true);
        
        // First verify OTP
        await pledgeService.verifyOTP(pledgeData.email, otp);
        
        // Then submit pledge
        const submissionData = {
          config_id: pledgeConfig.id,
          ...pledgeData
        };
        
        const result = await pledgeService.submitPledge(submissionData);
        
        setShowPledgeForm(false);
        setPledgeStep(1);
        setShowSuccess(true);
        setSuccessDetails({
          email: pledgeData.email,
          certificateUrl: result.certificate_url,
          emailSent: result.email_sent
        });
        
        // Update pledge count
        setPledgeConfig(prev => ({ ...prev, pledge_count: prev.pledge_count + 1 }));

        // Reset form
        setPledgeData({
          title: '',
          name: '',
          gender: '',
          dob: '',
          pincode: '',
          state: '',
          district: '',
          email: '',
          mobile: '',
          language: ''
        });
        setOtp('');
        setLoading(false);



      } catch (error) {
        setLoading(false);
        showStatus('error', 'Error: ' + error.message);
      }
    }
  };

  const selectedLanguage = pledgeData.language || 'English';
  const selectedPledgeContent =
    pledgeContent?.[selectedLanguage] ||
    pledgeContent?.English ||
    pledgeContent?.Hindi ||
    null;
  const selectedPledgeTitle = selectedPledgeContent?.pledge_title || pledgeConfig?.title || '';
  const secondaryPledgeTitle =
    selectedLanguage === 'Hindi'
      ? pledgeContent?.English?.pledge_title
      : pledgeContent?.Hindi?.pledge_title;
  const selectedPledgeHeading = selectedLanguage === 'Hindi' ? 'मैं शपथ लेता/लेती हूं:' : 'I pledge to:';
  const selectedPledgeReadLabel = selectedLanguage === 'Hindi' ? 'प्रतिज्ञा पढ़िए' : 'Read Pledge';
  const selectedOtpLabel = selectedLanguage === 'Hindi' ? 'कृपया OTP दर्ज करें' : 'Please Enter OTP';

  const states = [
    'ANDAMAN & NICOBAR ISLANDS', 'ANDHRA PRADESH', 'ARUNACHAL PRADESH', 'ASSAM', 'BIHAR',
    'CHANDIGARH', 'CHHATTISGARH', 'DADRA AND NAGAR HAVELI AND DAMAN AND DIU', 'DELHI', 'GOA',
    'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JAMMU & KASHMIR', 'JHARKHAND', 'KARNATAKA',
    'KERALA', 'LADAKH', 'LAKSHADWEEP', 'MADHYA PRADESH', 'MAHARASHTRA', 'MANIPUR', 'MEGHALAYA',
    'MIZORAM', 'NAGALAND', 'ODISHA', 'PUDUCHERRY', 'PUNJAB', 'RAJASTHAN', 'SIKKIM', 'TAMIL NADU',
    'TELANGANA', 'TRIPURA', 'UTTAR PRADESH', 'UTTARAKHAND', 'WEST BENGAL'
  ];

  const stateDistrictMap = {
    'ANDAMAN & NICOBAR ISLANDS': ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
    'ANDHRA PRADESH': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
    'ARUNACHAL PRADESH': ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
    'ASSAM': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
    'BIHAR': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
    'CHANDIGARH': ['Chandigarh'],
    'CHHATTISGARH': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela Pendra Marwahi', 'Janjgir Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
    'DADRA AND NAGAR HAVELI AND DAMAN AND DIU': ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
    'DELHI': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'GOA': ['North Goa', 'South Goa'],
    'GUJARAT': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
    'HARYANA': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'HIMACHAL PRADESH': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
    'JAMMU & KASHMIR': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
    'JHARKHAND': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahebganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
    'KARNATAKA': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
    'KERALA': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    'LADAKH': ['Kargil', 'Leh'],
    'LAKSHADWEEP': ['Lakshadweep'],
    'MADHYA PRADESH': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chachaura', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Maihar', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
    'MAHARASHTRA': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    'MANIPUR': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
    'MEGHALAYA': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    'MIZORAM': ['Aizawl', 'Champhai', 'Hnahthial', 'Kolasib', 'Khawzawl', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'],
    'NAGALAND': ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Noklak', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    'ODISHA': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
    'PUDUCHERRY': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
    'PUNJAB': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar', 'Shaheed Bhagat Singh Nagar', 'Tarn Taran'],
    'RAJASTHAN': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
    'SIKKIM': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    'TAMIL NADU': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    'TELANGANA': ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
    'TRIPURA': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    'UTTAR PRADESH': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shrawasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
    'UTTARAKHAND': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    'WEST BENGAL': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur']
  };

  const shareUrl = window.location.href;
  const shareText = `Join me in taking the ${pledgeConfig?.title || 'Road Safety Pledge'}! Let's make Indian roads safer for everyone. 🚗🛡️`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    showStatus('success', 'Link copied to clipboard.');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load pledge data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // No pledge configuration
  if (!pledgeConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No active pledge campaign</h2>
          <p className="text-gray-600">Please check back later for new pledge campaigns.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-0">
      {statusMessage && (
        <div className={`fixed top-4 right-4 z-[120] flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg ${statusMessage.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {statusMessage.type === 'error' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
          <span>{statusMessage.message}</span>
        </div>
      )}

      {showSuccess && successDetails && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/55 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/15 p-3">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Congratulations!</h3>
                    <p className="mt-1 text-sm text-white/85">Your pledge has been submitted successfully.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeSuccessModal}
                  className="rounded-full p-1 text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 px-6 py-6 text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Certificate Email</p>
                    <p className="text-sm break-all">{successDetails.email}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {successDetails.emailSent ? 'The certificate PDF has been sent to this email address.' : 'Certificate was generated, but email delivery could not be confirmed.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-sky-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Certificate Download</p>
                    <a
                      href={successDetails.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex break-all text-sm text-sky-700 underline underline-offset-2"
                    >
                      {successDetails.certificateUrl}
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600">Thank you for being a Safety Ambassador.</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={successDetails.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary/90 sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </a>
                <button
                  type="button"
                  onClick={closeSuccessModal}
                  className="w-full rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          {/* Google Translate - Only on Pledge Page */}

          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Shield className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {pledgeConfig.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            {pledgeConfig.description}
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Take Pledge Button */}
            <button
              onClick={() => setShowPledgeForm(true)}
              className="group bg-primary text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <PenTool className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Take Pledge</span>
            </button>

            {/* Share Pledge Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="group bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold text-base hover:bg-primary hover:text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Share Pledge</span>
            </button>
          </div>

          {/* Sample Certificate */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Sample Pledge Certificate</h3>
              <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-dashed border-primary">
                <img
                    src="/src/assets/images/Road Safety Pledge.png"
                    alt="Road Safety Pledge Certificate"
                    className="w-full h-auto rounded-lg"
                  />
              </div>
          </div>
        </div>
      </section>


      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <Share2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Share the Pledge</h3>
              <p className="text-gray-600">Help spread road safety awareness</p>
            </div>

            <div className="space-y-4">
              {/* Social Media Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-400 text-white px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-800 text-white px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Copy className="w-5 h-5" />
                Copy Link
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-6 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pledge Form Modal */}
      {showPledgeForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-4xl w-full max-h-[95vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowPledgeForm(false);
                setPledgeStep(1);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Step 1: Initial Options */}
            {pledgeStep === 1 && (
              <div className="text-center px-2 sm:px-4">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4 sm:mb-6" />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <div className="text-lg sm:text-xl md:text-2xl">शपथ लीजिये</div>
                  <div className="text-base sm:text-lg md:text-xl text-gray-600">Take Pledge</div>
                </h3>

                <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                  <button
                    onClick={() => {
                      setShowExistingCertificateForm(false);
                      setExistingCertificateOtpSent(false);
                      setExistingCertificateOtp('');
                      setPledgeStep(2);
                    }}
                    className="w-full bg-primary text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-left"
                  >
                    <div className="text-base sm:text-lg">शपथ लीजिये</div>
                    <div className="text-xs sm:text-sm opacity-90">Take Pledge</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowExistingCertificateForm((prev) => {
                        const next = !prev;
                        if (!next) {
                          setExistingCertificateOtpSent(false);
                          setExistingCertificateOtp('');
                        }
                        return next;
                      });
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-left"
                  >
                    <div className="text-xs sm:text-sm leading-tight">यदि प्रतिज्ञा पहले ही ले ली है तो वचनबद्धता का प्रमाण-पत्र प्राप्त करें</div>
                    <div className="text-xs opacity-70 mt-1">{showExistingCertificateForm ? 'Hide certificate options' : 'If already taken Pledge, Get the Certificate of Commitment'}</div>
                  </button>

                  {showExistingCertificateForm && (
                    <>
                  <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 text-left">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      value={existingPledgeEmail}
                          onChange={(e) => {
                            setExistingPledgeEmail(e.target.value);
                            setExistingCertificateOtp('');
                            setExistingCertificateOtpSent(false);
                          }}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
                      placeholder="Enter your registered email"
                      disabled={existingCertificateLoading}
                    />
                        <p className="mt-2 text-xs text-gray-500">
                          Use the same email address used when you submitted the pledge.
                        </p>
                        <button
                          type="button"
                          onClick={handleSendExistingCertificateOtp}
                          disabled={existingCertificateLoading}
                          className="mt-3 inline-flex rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
                        >
                          {existingCertificateLoading ? 'Sending OTP...' : existingCertificateOtpSent ? 'Resend OTP' : 'Send OTP'}
                        </button>
                      </div>

                      {existingCertificateOtpSent && (
                        <>
                          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 sm:p-4 text-left">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                              Enter OTP
                            </label>
                            <input
                              type="text"
                              value={existingCertificateOtp}
                              onChange={(e) => setExistingCertificateOtp(e.target.value.replace(/\D/g, ''))}
                              maxLength="6"
                              inputMode="numeric"
                              pattern="[0-9]{6}"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg tracking-widest focus:border-primary focus:ring-2 focus:ring-primary"
                              placeholder="000000"
                              disabled={existingCertificateLoading}
                            />
                            <p className="mt-2 text-xs text-gray-500">
                              Enter the OTP sent to your registered email to access the certificate.
                            </p>
                          </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleExistingCertificateRequest('send_email')}
                      disabled={existingCertificateLoading}
                      className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors disabled:opacity-60"
                    >
                      <div className="text-xs sm:text-sm leading-tight">प्रमाणपत्र अपने ई-मेल | मोबाइल पर भेजें</div>
                      <div className="text-xs opacity-70 mt-1">{existingCertificateLoading ? 'Processing...' : 'Send certificate to your Email'}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExistingCertificateRequest('download')}
                      disabled={existingCertificateLoading}
                      className="bg-green-100 text-green-700 px-3 sm:px-4 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors disabled:opacity-60"
                    >
                      <div className="text-xs sm:text-sm">प्रमाणपत्र डाउनलोड</div>
                      <div className="text-xs opacity-70 mt-1">{existingCertificateLoading ? 'Processing...' : 'Download Certificate'}</div>
                    </button>
                  </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Basic Details */}
            {pledgeStep === 2 && (
              <div className="px-2 sm:px-4">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {selectedPledgeTitle && (
                      <>
                        <div className="text-base sm:text-lg">{selectedPledgeTitle}</div>
                        {secondaryPledgeTitle && (
                          <div className="text-sm sm:text-base text-gray-600">{secondaryPledgeTitle}</div>
                        )}
                      </>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <div className="text-sm sm:text-base">बुनियादी ब्योरा दर्ज कीजिये</div>
                    <div className="text-xs sm:text-sm">Enter Basic Details</div>
                  </p>
                </div>

                <form onSubmit={handlePledgeSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          नाम | Name *
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <select
                            name="title"
                            value={pledgeData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">-Select-</option>
                            <option value="Shri">Shri</option>
                            <option value="Smt">Smt</option>
                            <option value="Kumari">Kumari</option>
                            <option value="Dr">Dr</option>
                            <option value="Master">Master</option>
                            <option value="Miss">Miss</option>
                            <option value="Others">Others</option>
                          </select>
                          <input
                            type="text"
                            name="name"
                            value={pledgeData.name}
                            onChange={handleInputChange}
                            required
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          लिंग | Gender *
                        </label>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={pledgeData.gender === 'Male'}
                              onChange={handleInputChange}
                              required
                              className="mr-2"
                            />
                            Male
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={pledgeData.gender === 'Female'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Female
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="gender"
                              value="Others"
                              checked={pledgeData.gender === 'Others'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            Others
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          जन्म तिथि | Date Of Birth *
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={pledgeData.dob}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          पिन कोड | Pin Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={pledgeData.pincode}
                          onChange={handleInputChange}
                          required
                          maxLength="6"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Enter pin code"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          राज्य | State *
                        </label>
                        <select
                          name="state"
                          value={pledgeData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">---Select---</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          जिला | District *
                        </label>
                        <select
                          name="district"
                          value={pledgeData.district}
                          onChange={handleInputChange}
                          required
                          disabled={!pledgeData.state}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                        >
                          <option value="">
                            {pledgeData.state ? '---Select District---' : '---Select State First---'}
                          </option>
                          {pledgeData.state && stateDistrictMap[pledgeData.state]?.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          ईमेल | Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={pledgeData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                          मोबाइल | Mobile *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={pledgeData.mobile}
                          onChange={handleInputChange}
                          required
                          maxLength="10"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Enter mobile number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mt-4">
                    <div className="text-xs sm:text-sm text-blue-800">
                      <div className="font-medium">प्रमाणपत्र की प्रतिलिपि ईमेल द्वारा भेजी जाएगी</div>
                      <div className="text-xs opacity-80">A copy of certificate will be sent to your email address.</div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
                      मैं सुरक्षा राजदूत (Safety Ambassador) के रूप में प्रतिबद्ध हूं, सड़क सुरक्षा के प्रति जागरूकता फैलाने और हमारे रास्तों को सभी के लिए सुरक्षित बनाने के लिए कार्य करूंगा/करूंगी।
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setPledgeStep(1)}
                      className="w-full sm:flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Language Selection */}
            {pledgeStep === 3 && (
              <div className="px-2 sm:px-4">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    <div className="text-base sm:text-lg">सड़क सुरक्षा शपथ 2024</div>
                    <div className="text-sm sm:text-base text-gray-600">Road Safety Pledge 2024</div>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    प्रतिज्ञा की भाषा चुनिये | Select Pledge Language
                  </p>
                </div>

                <form onSubmit={handlePledgeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                      भाषा | Language
                    </label>
                    <select
                      name="language"
                      value={pledgeData.language}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                    >
                      <option value="">-Select Language-</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setPledgeStep(2)}
                      className="w-full sm:flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                      Read Pledge
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Read Pledge */}
            {pledgeStep === 4 && (
              <div className="px-2 sm:px-4">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {selectedPledgeTitle && (
                      <>
                        <div className="text-base sm:text-lg">{selectedPledgeTitle}</div>
                        {secondaryPledgeTitle && (
                          <div className="text-sm sm:text-base text-gray-600">{secondaryPledgeTitle}</div>
                        )}
                      </>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    प्रतिज्ञा पढ़िये | Read Pledge
                  </p>
                </div>

                <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg mb-4 sm:mb-6 max-h-60 sm:max-h-80 overflow-y-auto">
                  <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">{selectedPledgeHeading}</h4>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm leading-relaxed">
                    {selectedPledgeContent?.pledge_points?.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handlePledgeSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setPledgeStep(3)}
                      className="w-full sm:flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                      Continue to OTP
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 5: OTP Verification */}
            {pledgeStep === 5 && (
              <div className="px-2 sm:px-4">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {selectedPledgeTitle && (
                      <>
                        <div className="text-base sm:text-lg">{selectedPledgeTitle}</div>
                        {secondaryPledgeTitle && (
                          <div className="text-sm sm:text-base text-gray-600">{secondaryPledgeTitle}</div>
                        )}
                      </>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">{selectedOtpLabel}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 break-all">
                    OTP sent to {pledgeData.email}
                  </p>
                </div>

                <form onSubmit={handlePledgeSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Enter OTP *
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      required
                      maxLength="6"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg sm:text-xl md:text-2xl tracking-widest"
                      placeholder="000000"
                      disabled={loading}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          setLoading(true);
                          setOtp('');
                          await pledgeService.sendOTP(pledgeData.email, pledgeData.name, pledgeData.mobile);
                          showStatus('success', 'OTP resent successfully.');
                        } catch (error) {
                          showStatus('error', 'Error resending OTP: ' + error.message);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="text-primary hover:text-primary/80 text-xs sm:text-sm underline disabled:opacity-50"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setPledgeStep(4)}
                      className="w-full sm:flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                      disabled={loading}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Submit Pledge'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default PledgePage;
