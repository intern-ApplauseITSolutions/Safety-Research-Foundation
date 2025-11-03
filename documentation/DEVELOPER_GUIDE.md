# Developer Setup & Troubleshooting Guide

Complete guide for developers working on the Safety Research Foundation website.

## Table of Contents
1. [Environment Setup](#environment-setup)
2. [Development Workflow](#development-workflow)
3. [Common Issues & Solutions](#common-issues--solutions)
4. [Code Standards](#code-standards)
5. [Git Workflow](#git-workflow)
6. [Testing Guidelines](#testing-guidelines)
7. [Performance Optimization](#performance-optimization)
8. [Debugging Tips](#debugging-tips)

---

## Environment Setup

### Prerequisites

**Required:**
- Node.js v16.0.0 or higher
- npm v8.0.0 or higher
- Git
- Modern web browser (Chrome/Firefox/Edge)

**Recommended:**
- VS Code or similar IDE
- React Developer Tools browser extension
- Git GUI client (optional)

### Initial Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd road-saftey
```

2. **Install dependencies**
```bash
npm install
```

3. **Verify installation**
```bash
npm list react react-dom react-router-dom
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to `http://localhost:5173`

### VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## Development Workflow

### Project Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Maintenance
npm install              # Install/update dependencies
npm audit                # Check for vulnerabilities
npm audit fix            # Fix vulnerabilities
```

### File Structure Guidelines

```
New Component Checklist:
□ Create component file in appropriate folder
□ Add proper imports (React, icons, assets)
□ Use functional component with hooks
□ Add PropTypes or TypeScript (if applicable)
□ Include JSDoc comments for complex functions
□ Export component (default for components, named for utilities)
□ Test in browser
□ Check responsive design
```

### Adding a New Page

1. **Create page component** in `src/pages/`
```javascript
// src/pages/NewPage.jsx
import React from 'react';
import SectionComponent from '../components/sections/...';

export default function NewPage() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <SectionComponent />
    </div>
  );
}
```

2. **Add route** in `App.jsx`
```javascript
import NewPage from './pages/NewPage';

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

3. **Add navigation link** in `Header.jsx`
```javascript
<NavLink to="/new-page" className={...}>
  New Page
</NavLink>
```

### Adding a New Section

1. **Create section component** in appropriate folder:
```javascript
// src/components/sections/category/NewSection.jsx
import React from 'react';
import { IconName } from 'lucide-react';

export default function NewSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
      </div>
    </section>
  );
}
```

2. **Import and use** in page component
3. **Test responsiveness**
4. **Check accessibility**

---

## Common Issues & Solutions

### Issue: Port Already in Use

**Problem:** Error message: "Port 5173 is already in use"

**Solutions:**
```bash
# Option 1: Kill the process
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- --port 3000
```

### Issue: Module Not Found

**Problem:** Error: "Cannot find module 'module-name'"

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or clear npm cache
npm cache clean --force
npm install
```

### Issue: Images Not Loading

**Problem:** Images showing broken link icon

**Solutions:**
1. **Check file path:**
```javascript
// Correct
import image from '../assets/images/image.jpg';

// Incorrect (missing '../')
import image from 'assets/images/image.jpg';
```

2. **Check file exists:**
```bash
# Verify file location
ls src/assets/images/
```

3. **Check file extension:**
- Use exact case: `.jpg` not `.JPG`
- Supported formats: jpg, jpeg, png, gif, svg, webp

### Issue: Styling Not Applied

**Problem:** TailwindCSS classes not working

**Solutions:**
1. **Check tailwind.config.js content paths:**
```javascript
content: [
  './index.html',
  './src/**/*.{js,jsx,ts,tsx}'
]
```

2. **Restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

3. **Clear browser cache:**
- Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Issue: Build Fails

**Problem:** npm run build produces errors

**Solutions:**
1. **Check for console errors:**
```bash
npm run build 2>&1 | tee build-log.txt
```

2. **Common fixes:**
```bash
# Update dependencies
npm update

# Remove unused imports
# Fix any TypeScript/PropTypes errors
# Check for missing files
```

3. **Verify environment:**
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
```

### Issue: Slow Development Server

**Problem:** Dev server is slow or unresponsive

**Solutions:**
1. **Clear Vite cache:**
```bash
rm -rf node_modules/.vite
npm run dev
```

2. **Optimize images:**
- Reduce image file sizes
- Use appropriate formats (WebP for photos)
- Implement lazy loading

3. **Check system resources:**
- Close unnecessary applications
- Check RAM usage
- Restart development server

---

## Code Standards

### JavaScript/React

**Naming Conventions:**
```javascript
// Components: PascalCase
function ComponentName() {}

// Functions: camelCase
function handleClick() {}

// Constants: UPPER_SNAKE_CASE
const API_URL = 'https://...';

// Files: PascalCase for components, camelCase for utilities
// ComponentName.jsx, utilityFunction.js
```

**Component Structure:**
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';
import ChildComponent from './ChildComponent';
import image from '../assets/image.jpg';

// 2. Constants
const CONSTANT_VALUE = 'value';

// 3. Component
export default function ComponentName({ prop1, prop2 }) {
  // 3a. State declarations
  const [state, setState] = useState(initialValue);
  
  // 3b. Refs
  const ref = useRef(null);
  
  // 3c. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 3d. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 3e. Render helpers (if needed)
  const renderContent = () => {
    return <div>Content</div>;
  };
  
  // 3f. Return JSX
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

**Best Practices:**
```javascript
// ✅ Good
const handleSubmit = (e) => {
  e.preventDefault();
  // Logic
};

// ❌ Avoid
function handleSubmit(e) {
  // Missing preventDefault
}

// ✅ Good
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

// ❌ Avoid
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}
```

### CSS/Tailwind

**Class Order:**
```javascript
className="
  // Layout
  flex items-center justify-center
  // Sizing
  w-full h-auto
  // Spacing
  p-4 m-2 gap-4
  // Typography
  text-lg font-bold
  // Colors
  bg-white text-gray-900
  // Borders
  border-2 border-gray-200 rounded-lg
  // Effects
  shadow-lg hover:shadow-xl
  // Transitions
  transition-all duration-300
"
```

**Responsive Design:**
```javascript
// Mobile-first approach
className="
  text-base           // Mobile
  sm:text-lg          // Small screens (640px+)
  md:text-xl          // Medium screens (768px+)
  lg:text-2xl         // Large screens (1024px+)
  xl:text-3xl         // Extra large (1280px+)
"
```

### Git Commit Messages

**Format:**
```
<type>: <subject>

<body>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: Add team member detail page"
git commit -m "fix: Resolve image loading issue in HeroBanner"
git commit -m "docs: Update DOCUMENTATION.md with new sections"
git commit -m "style: Improve responsive layout on mobile"
```

---

## Git Workflow

### Branch Strategy

```bash
main          # Production-ready code
├── develop   # Development branch
    ├── feature/new-feature
    ├── bugfix/fix-issue
    └── hotfix/urgent-fix
```

### Workflow Commands

```bash
# Create feature branch
git checkout -b feature/feature-name

# Regular commits
git add .
git commit -m "feat: Add new feature"

# Push to remote
git push origin feature/feature-name

# Update from main
git checkout main
git pull origin main
git checkout feature/feature-name
git merge main

# Merge feature (via Pull Request preferred)
git checkout develop
git merge feature/feature-name
```

### Before Committing

```bash
# 1. Check status
git status

# 2. Review changes
git diff

# 3. Test locally
npm run dev

# 4. Build test
npm run build

# 5. Add files
git add <files>

# 6. Commit with message
git commit -m "type: message"

# 7. Push
git push
```

---

## Testing Guidelines

### Manual Testing Checklist

**Before Each Commit:**
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Images display correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] No console errors
- [ ] Links work correctly

**Testing Responsive Design:**
```
Device Sizes to Test:
- Mobile: 375px (iPhone SE)
- Mobile: 390px (iPhone 12)
- Tablet: 768px (iPad)
- Desktop: 1440px (Standard)
- Large: 1920px (Full HD)
```

**Browser DevTools:**
```bash
# Chrome DevTools Shortcuts
F12 or Ctrl+Shift+I    # Open DevTools
Ctrl+Shift+M           # Toggle device toolbar
Ctrl+Shift+C           # Inspect element
```

### Component Testing

**Test Cases:**
```javascript
// For each component, verify:
1. Renders without errors
2. Props work correctly
3. State updates properly
4. Events fire correctly
5. Conditional rendering works
6. Error boundaries handle errors
7. Accessibility (keyboard navigation, screen readers)
```

---

## Performance Optimization

### Image Optimization

**Best Practices:**
```javascript
// 1. Use appropriate formats
.jpg  - Photos
.png  - Graphics with transparency
.svg  - Icons and logos
.webp - Modern format (best compression)

// 2. Lazy loading
<img loading="lazy" src="..." alt="..." />

// 3. Responsive images
<img 
  srcSet="image-small.jpg 640w, image-large.jpg 1920w"
  sizes="(max-width: 640px) 100vw, 50vw"
  src="image.jpg"
  alt="..."
/>

// 4. Compress images
// Use tools: TinyPNG, ImageOptim, Squoosh
```

### Code Splitting

```javascript
// Lazy load components
const HeavyComponent = React.lazy(() => 
  import('./components/HeavyComponent')
);

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### Bundle Size

```bash
# Analyze bundle size
npm run build
# Check dist folder size

# Visualize bundle (if needed)
npm install --save-dev rollup-plugin-visualizer
```

---

## Debugging Tips

### React DevTools

**Installation:**
- Chrome: https://chrome.google.com/webstore (search "React Developer Tools")
- Firefox: https://addons.mozilla.org (search "React Developer Tools")

**Usage:**
1. Open DevTools (F12)
2. Select "Components" or "Profiler" tab
3. Inspect component props and state
4. Track component renders

### Console Logging

**Effective Debugging:**
```javascript
// ✅ Good: Labeled console logs
console.log('User data:', userData);
console.error('Error in handleSubmit:', error);
console.warn('Deprecated function used');

// ✅ Good: Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', debugInfo);
}

// ❌ Avoid: Unlabeled logs
console.log(data);
```

### Common Debugging Scenarios

**Issue: Component Not Re-rendering**
```javascript
// Check dependencies array
useEffect(() => {
  // Effect
}, [dependency]); // Make sure this includes all dependencies

// Check state updates
setState(prevState => ({
  ...prevState,
  newKey: newValue
})); // Use functional update
```

**Issue: Infinite Loop**
```javascript
// Problem: Missing dependency array
useEffect(() => {
  setState(newValue);
}); // ❌ Runs on every render

// Solution: Add dependency array
useEffect(() => {
  setState(newValue);
}, []); // ✅ Runs once on mount
```

**Issue: Event Handler Not Working**
```javascript
// Problem: Called immediately
<button onClick={handleClick()}>Click</button>

// Solution: Pass function reference
<button onClick={handleClick}>Click</button>

// Or use arrow function
<button onClick={() => handleClick(param)}>Click</button>
```

### Network Issues

**Check API Calls:**
```javascript
// Open DevTools Network tab
// Filter by: XHR, Fetch
// Check: Status, Response, Headers

// Add error handling
fetch(url)
  .then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

---

## Quick Reference Commands

```bash
# Development
npm install                  # Install dependencies
npm run dev                  # Start dev server
npm run build                # Build for production
npm run preview              # Preview build

# Maintenance
npm update                   # Update packages
npm audit                    # Security audit
npm audit fix                # Fix vulnerabilities
npm outdated                 # Check outdated packages

# Git
git status                   # Check status
git add .                    # Stage all changes
git commit -m "message"      # Commit changes
git push                     # Push to remote
git pull                     # Pull from remote
git log --oneline           # View commit history

# Node/npm
node --version              # Check Node version
npm --version               # Check npm version
npx --version               # Check npx version

# Cleanup
rm -rf node_modules         # Remove node_modules
rm package-lock.json        # Remove lock file
npm cache clean --force     # Clear npm cache
```

---

## Useful Resources

**Official Documentation:**
- React: https://react.dev/
- Vite: https://vitejs.dev/
- TailwindCSS: https://tailwindcss.com/
- React Router: https://reactrouter.com/
- Lucide Icons: https://lucide.dev/

**Learning Resources:**
- React Tutorial: https://react.dev/learn
- JavaScript Info: https://javascript.info/
- MDN Web Docs: https://developer.mozilla.org/

**Tools:**
- Can I Use: https://caniuse.com/
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

---

## Support & Help

**Internal:**
- Check DOCUMENTATION.md for detailed info
- Check COMPONENT_REFERENCE.md for component details
- Review code comments in source files

**External:**
- React community: https://react.dev/community
- Stack Overflow: Tag [reactjs]
- GitHub Issues: Report bugs in repository

**Contact:**
- Development Team: [team email]
- Project Lead: [lead email]

---

**Developer Guide Version:** 1.0  
**Last Updated:** 2025  
**Maintained By:** Development Team

---

*Happy Coding! 🚀*
