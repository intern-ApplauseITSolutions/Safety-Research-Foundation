# Component Reference Guide

Quick reference for all components in the Safety Research Foundation website.

## Table of Contents
- [Layout Components](#layout-components)
- [Page Components](#page-components)
- [Section Components](#section-components)
- [Utility Components](#utility-components)

---

## Layout Components

### Header.jsx
**Location:** `src/components/layout/Header.jsx`  
**Purpose:** Main navigation header with tricolor bar

**Key Features:**
- Responsive navigation menu
- Indian flag tricolor design
- Social media links
- Mobile hamburger menu
- Dropdown support
- Active route highlighting

**State:**
- `isMenuOpen` - Controls mobile menu visibility
- `openDropdown` - Tracks which dropdown is open
- `mobileDropdown` - Mobile dropdown state

**External Links:**
- Phone: +91 7030910122
- Email: contact@safetyresearchfoundation.org
- LinkedIn, Facebook, Twitter/X

---

### Footer.jsx
**Location:** `src/components/layout/Footer.jsx`  
**Purpose:** Site footer with links and contact info

**Features:**
- Quick links navigation
- Contact information
- Google Maps integration
- Social media links
- Gradient background

**Sections:**
1. About section with logo
2. Quick links
3. Contact info
4. Map embed

---

## Page Components

### HomePage.jsx
**Location:** `src/pages/HomePage.jsx`  
**Route:** `/`

**Sections Used:**
```jsx
<HeroBanner />
<RoadScene />
<TwoWheelerOrganization />
<Training />
<Testimonials />
```

**Commented Out:**
- Stats
- Mission
- QuickLinks
- CallToAction

---

### AboutPage.jsx
**Location:** `src/pages/AboutPage.jsx`  
**Route:** `/about`

**Sections Used:**
```jsx
<Banner />
<TwoWheelerOrg />
<CreativeTeam />
```

**Special Handling:**
- Overflow-X prevention
- Scroll to top on mount

---

### FocusPage.jsx
**Location:** `src/pages/FocusPage.jsx`  
**Route:** `/focus`

**Sections Used:**
```jsx
<RoadSafetyFocus />
```

---

### EventsPage.jsx
**Location:** `src/pages/EventsPage.jsx`  
**Route:** `/events`

**Sections Used:**
```jsx
<NewsAndEvents />
```

---

### ContactPage.jsx
**Location:** `src/pages/ContactPage.jsx`  
**Route:** `/contact`

**Sections Used:**
```jsx
<ContactUs />
```

---

### GetInvolvedPage.jsx
**Location:** `src/pages/GetInvolvedPage.jsx`  
**Route:** `/get-involved`

**State Management:**
```javascript
copiedText - Tracks copied bank details
showDonationForm - Modal visibility
showThankYou - Success message visibility
activeTab - 'individual' | 'organization'
selectedOption - 'csr' | other options
formData - Form data for both tabs
```

**Form Types:**
1. Individual Donation Form
2. Organization/CSR Form

**Features:**
- Bank details with copy to clipboard
- Multi-currency support (INR, USD, EUR, GBP)
- State selection for India
- PAN card field for organizations
- Tax exemption information (80G)

---

### PledgePage.jsx
**Location:** `src/pages/PledgePage.jsx`  
**Route:** `/pledge`

**State Management:**
```javascript
showShareModal - Share modal visibility
showPledgeForm - Pledge form visibility
pledgeStep - Current step (1-5)
pledgeData - Form data
pledgeCount - Total pledges taken
showSuccess - Success message visibility
otp - OTP input
```

**Pledge Steps:**
1. Initial information
2. Personal details
3. Language selection
4. Read pledge
5. OTP verification

**Features:**
- Multi-step form
- State/District cascading selection
- Social sharing
- Success confirmation

---

## Section Components

### Home Sections

#### HeroBanner.jsx
**Location:** `src/components/sections/home/HeroBanner.jsx`

**Props:** None

**State:**
```javascript
currentImage - Current carousel index
images - Array of banner images
isLoading - Loading state
```

**Constants:**
- `staticImages` - Fallback images
- `slideDuration` - 5000ms

**Features:**
- Auto-carousel (5s interval)
- Progress indicators
- Image counter
- Statistics display

**Statistics:**
- 10K+ Lives Impacted
- 500+ Programs
- 25+ Years

---

#### RoadScene.jsx
**Location:** `src/components/sections/home/RoadScene.jsx`

**Props:** None

**Features:**
- Animated vehicles
- Traffic signal
- Zebra crossing
- Family pedestrians
- Nature background

**Animation Timings:**
- Truck: 12s
- Car: 12s
- Bike: 8s

---

#### TwoWheelerOrganization.jsx
**Location:** `src/components/sections/home/TwoWheelerOrganization.jsx`

**Props:** None

**State:**
- Auto-scroll container

**Events Data:**
- 25 events (2017-2025)
- Categories: School Program, Public Awareness, Webinar, Safety Audit, Police Support

**Features:**
- Auto-scroll with pause on hover
- Infinite scroll effect
- Event navigation
- Clickable event cards

---

#### Training.jsx
**Location:** `src/components/sections/home/Training.jsx`

**Props:** None

**Training Programs:**
1. Road Safety Training
2. Road Infrastructure Improvements
3. Create Public Awareness
4. People/Driver Training

**Features:**
- 4-column grid
- Image display
- Hover effects

---

#### Testimonials.jsx
**Location:** `src/components/sections/Testimonials.jsx`

**Props:** None

**State:**
```javascript
currentIndex - Current testimonial
isPaused - Pause state
slidesPerView - Responsive slides count (1/2/3)
```

**Features:**
- Auto-play (4s interval)
- Manual navigation
- Responsive layout
- Pause on hover/touch
- 10 testimonials

---

### About Sections

#### Banner.jsx
**Location:** `src/components/sections/about/Banner.jsx`

**Props:** None

**Features:**
- Vision statement
- Animated road scene
- Moving vehicles
- Gradient background

---

#### TwoWheelerOrg.jsx (About)
**Location:** `src/components/sections/about/TwoWheelerOrg.jsx`

**Props:** None

**Focus Areas:**
1. Road Safety Training
2. Road Infrastructure improvements
3. Create Public awareness
4. People/Driver training

**Features:**
- Alternating layout
- Scroll animations
- Icon integration
- Detailed bullet points

---

#### CreativeTeam.jsx
**Location:** `src/components/sections/about/CreativeTeam.jsx`

**Props:** None

**Team Members:**
1. Jeya Padmanaban (ID: 1)
2. Ajit Dandapani (ID: 2)
3. Chitra Subramaniam (ID: 3)
4. Sesh Subramaniam (ID: 4)
5. Sandip Nawale (ID: 5)

**Features:**
- Responsive grid (1-5 columns)
- Click to view details
- Hover animations
- Organization values display

**Values:**
- Innovation
- Collaboration
- Independence
- Honesty
- High Integrity

---

### Focus Sections

#### RoadSafetyFocus.jsx
**Location:** `src/components/sections/ourfocus/RoadSafetyFocus.jsx`

**Props:** None

**State:**
- Intersection Observer refs

**The 3 E's:**
1. Engineering
2. Education
3. Advocacy

**Focus Areas:**
1. Road Safety Training
2. Road Infrastructure Improvements
3. Road Safety Awareness
4. People/Driver Training

**Features:**
- Scroll-triggered animations
- Intersection Observer
- Alternating layouts

---

### Events Sections

#### NewsAndEvents.jsx
**Location:** `src/components/sections/newsandevents/NewsAndEvents.jsx`

**Props:** None

**Events Count:** 25+ events

**Event Structure:**
```javascript
{
  id: number
  title: string
  date: string
  location: string
  category: string
  excerpt: string
  content: string
  fullDescription: string
  image: string
  images: array
  featured: boolean
}
```

**Categories:**
- School Program
- Public Awareness
- Webinar
- Safety Audit
- Police Support
- Awareness Session

**Features:**
- Event cards
- Image galleries
- Category badges
- Event detail navigation

---

### Contact Sections

#### ContactUs.jsx
**Location:** `src/components/sections/contactus/ContactUs.jsx`

**Props:** None

**State:**
```javascript
formData: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
```

**Features:**
- Contact form
- Form validation
- Office hours display
- Google Maps integration
- Multiple contact methods

**Contact Methods:**
- Phone: +91 7030910122
- Email: contact@safetyresearchfoundation.org
- Address with map

**Office Hours:**
- Monday - Friday: 9:00 AM - 6:00 PM

---

## Page-Specific Components

### EventDetail.jsx
**Location:** `src/components/pages/EventDetail.jsx`  
**Route:** `/event/:id`

**Props:** None (uses useParams)

**Features:**
- Dynamic event loading by ID
- Image gallery with lightbox
- Navigation controls
- Back button
- Full event details

**Event Data:**
- Same as NewsAndEvents.jsx
- 25+ events with full details

---

### TeamDetail.jsx
**Location:** `src/components/pages/TeamDetail.jsx`  
**Route:** `/team/:id`

**Props:** None (uses useParams)

**Features:**
- Dynamic team member loading by ID
- Professional photo
- Bio and details
- Education history
- Achievements
- Expertise areas
- Back button

**Team Members:**
- Same as CreativeTeam.jsx
- 5 team members with full profiles

---

## Utility Components

### imageLoader.js
**Location:** `src/utils/imageLoader.js`

**Functions:**

#### getBannerImages()
```javascript
// Dynamically imports banner images
// Returns: Array of image modules
```

#### getManualBannerImages()
```javascript
// Manually imports fallback images
// Returns: Array of static image imports
```

#### refreshBannerImages()
```javascript
// Refreshes image cache
// Returns: Array of images
```

#### getAllBannerImages()
```javascript
// Tries dynamic, falls back to manual
// Returns: Array of banner images
```

**Usage:**
```javascript
import { getAllBannerImages } from '../utils/imageLoader';

const images = getAllBannerImages();
```

---

## Common Patterns

### Scroll to Top
Used in most pages:
```javascript
React.useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);
```

### Navigation with Scroll
```javascript
const navigate = useNavigate();

const handleClick = () => {
  navigate('/path');
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
};
```

### Form Handling
```javascript
const [formData, setFormData] = useState({});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle submission
};
```

### Hover State Management
```javascript
const [isPaused, setIsPaused] = useState(false);

<div
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
  {/* Content */}
</div>
```

---

## Icon Usage

All icons from **Lucide React**:

**Common Icons:**
- Shield, Users, Calendar, MapPin
- Phone, Mail, Building2
- Heart, HandHeart
- ArrowLeft, ArrowRight, ChevronDown
- Send, MessageSquare
- Star, Quote
- Construction, GraduationCap
- Megaphone, BookOpen

**Import:**
```javascript
import { IconName } from 'lucide-react';

<IconName className="w-6 h-6 text-primary" />
```

---

## Styling Patterns

### Card Styling
```jsx
className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 
border-2 border-dashed border-brand-black 
hover:border-primary hover:shadow-xl 
transition-all duration-300"
```

### Button Styling
```jsx
className="bg-primary hover:bg-primary/90 
text-white px-6 py-3 rounded-lg 
font-semibold transition-all duration-200 
shadow-md hover:shadow-lg"
```

### Section Header
```jsx
<div className="flex items-center justify-center mb-8">
  <div className="flex-1 h-0.5 bg-gradient-to-r 
    from-transparent via-primary to-primary"></div>
  <div className="mx-4 flex items-center gap-2">
    <Icon className="w-8 h-8 text-primary" />
    <h2 className="text-3xl font-bold text-gray-900">Title</h2>
  </div>
  <div className="flex-1 h-0.5 bg-gradient-to-l 
    from-transparent via-primary to-primary"></div>
</div>
```

---

## Animation Classes

**TailwindCSS:**
- `transition-all duration-300`
- `hover:scale-105`
- `hover:-translate-y-2`
- `group-hover:text-primary`

**Custom Animations (index.css):**
- `animate-float-smooth`
- `animate-float-delayed`
- `animate-[moveRight_12s_linear_infinite]`

---

## Responsive Patterns

### Grid Layouts
```jsx
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
```

### Text Sizes
```jsx
className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
```

### Padding
```jsx
className="p-4 sm:p-6 md:p-8 lg:p-10"
```

---

## Best Practices

1. **Always use `useEffect` for scroll to top**
2. **Use `preventDefault()` on form submissions**
3. **Add loading states for async operations**
4. **Provide fallback images**
5. **Use semantic HTML elements**
6. **Add ARIA labels for accessibility**
7. **Keep component state local when possible**
8. **Use descriptive variable names**
9. **Comment complex logic**
10. **Maintain consistent spacing**

---

**Quick Reference Version:** 1.0  
**Last Updated:** 2025  
**For Full Documentation:** See DOCUMENTATION.md
