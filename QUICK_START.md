# Quick Start Guide - Animal Health Advisory React App

## Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 3: Explore the App

#### Landing Page (`/`)
- Beautiful marketing homepage
- Overview of platform features
- Pricing information
- Call-to-action buttons

#### Role Selection (`/role-selection`)
- Choose your role: Veterinarian or Farmer
- Each role has a different dashboard

#### Veterinarian Dashboard (`/dashboard/veterinarian`)
**Quick Actions:**
- ✅ Manage appointments (accept/reject)
- 📝 Respond to farmer questions
- 📰 Share news and resources
- 👤 Update profile settings

**Key Sections:**
- **Appointments**: View pending requests from farmers
- **Questions**: Answer questions with full editor
- **News & Events**: Post veterinary updates
- **Resources**: Share educational materials
- **Account**: Manage veterinarian profile

#### Farmer Dashboard (`/dashboard/farmer`)
**Quick Actions:**
- 🐄 Add/manage farm animals
- 📅 Book appointments with vets
- ❓ Ask health questions
- 💹 Check market prices
- 👤 Update farm profile

**Key Sections:**
- **Animals**: Track all farm animals with health records
- **Appointments**: Schedule consultations with veterinarians
- **Questions**: Ask veterinarians for advice
- **News**: Read agricultural updates
- **Market Prices**: View current livestock prices
- **Account**: Manage farm information

## Features Overview

### 1. Modular Component Architecture
```jsx
// Every component has its own scoped CSS
import styles from './MyComponent.module.css'
<div className={styles.container}>...</div>
```

### 2. Global State Management
```jsx
// Access app state anywhere
const { userRole, appointments } = useApp()
```

### 3. Role-Based Routing
```jsx
// Automatically routes to role-specific dashboard
/dashboard/veterinarian → Vet UI
/dashboard/farmer → Farmer UI
```

### 4. Modern Design
- Blue gradient theme (#2563eb → #0891b2)
- Responsive mobile design
- Smooth animations
- Professional styling

## Common Tasks

### Adding a New Component

1. Create component file:
```jsx
// src/components/MyFeature/MyComponent.jsx
import React from 'react'
import styles from './MyComponent.module.css'

export default function MyComponent() {
  return <div className={styles.container}>...</div>
}
```

2. Create CSS module:
```css
/* src/components/MyFeature/MyComponent.module.css */
.container {
  padding: 2rem;
  background: white;
  border-radius: 1rem;
}
```

3. Import and use:
```jsx
import MyComponent from './MyFeature/MyComponent'
<MyComponent />
```

### Using Global State

```jsx
import { useApp } from '../context/AppContext'

export default function MyComponent() {
  const { userRole, addAppointment } = useApp()
  
  const handleBook = () => {
    addAppointment({ /* appointment data */ })
  }
  
  return <div>...</div>
}
```

### Adding Routes

```jsx
// In Dashboard.jsx or App.jsx
<Routes>
  <Route path="/my-new-page" element={<MyNewPage />} />
</Routes>
```

## Project Organization

### By Feature
- `/components/Veterinarian/` - All vet-specific components
- `/components/Farmer/` - All farmer-specific components
- `/components/Common/` - Shared reusable components
- `/components/Layout/` - Layout structure components

### By Concern
- `/pages/` - Full page components
- `/context/` - State management
- `/styles/` - Global styles
- `/components/` - UI components

## State Management

### AppContext provides:
```jsx
// User
userRole: 'veterinarian' | 'farmer'

// Vet data
appointments: [ { id, farmerName, date, status } ]
questions: [ { id, farmer, question, reply } ]

// Farmer data
animals: [ { id, name, type, health } ]
marketPrices: { cattle: 45000, goat: 8000 }

// Actions
setUserRole(role)
addAppointment(appt)
acceptAppointment(id)
rejectAppointment(id)
addQuestion(q)
replyToQuestion(id, reply)
```

## Styling System

### Global CSS Variables (`globals.css`)
```css
/* Colors */
--primary-color: #2563eb;
--accent-color: #0891b2;
--text-primary: #1a1a1a;

/* Spacing */
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;

/* Effects */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--radius-md: 0.75rem;
--transition-base: 0.3s ease;
```

### Component-Scoped CSS
```css
.button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  cursor: pointer;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## Responsive Design

All components are mobile-first and responsive:

```css
/* Mobile first */
.container {
  display: grid;
  grid-template-columns: 1fr;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new packages
npm install package-name

# Remove packages
npm uninstall package-name
```

## Mock Data

The app includes sample data in `AppContext.jsx`:

**Veterinarian:**
- 2 pending appointments
- 3 questions to answer
- 4 resource materials

**Farmer:**
- 5 farm animals (cows, goats, chickens)
- 3 scheduled appointments
- 2 pending questions
- Market prices for cattle, goats, chickens

## Performance Tips

1. **Use CSS Modules** - Prevents style conflicts
2. **Memoize callbacks** - Use `useCallback` for optimized re-renders
3. **Lazy load routes** - React Router supports lazy loading
4. **Optimize images** - Use appropriate image formats
5. **Code split** - Separate component bundles

## Debugging

### React DevTools
Install React DevTools browser extension to inspect:
- Component tree
- Props and state
- Performance metrics

### Console Logging
```jsx
const { appointments } = useApp()
console.log('Appointments:', appointments)
```

### Network Tab
Check network requests when integrating APIs

## Next Steps

1. **Backend Integration** - Replace mock data with API calls
2. **Authentication** - Add real user authentication
3. **Database** - Set up database for persistent storage
4. **Deployment** - Deploy to Vercel, Netlify, or your server
5. **Notifications** - Add real-time notification system
6. **Payments** - Integrate payment processing for premium features

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues
```bash
# Clear npm cache
npm cache clean --force
```

## Documentation Files

- **README.md** - Project overview and features
- **PROJECT_STRUCTURE.md** - Detailed architecture documentation
- **QUICK_START.md** - This file

## Support

For detailed information on:
- **Architecture**: See `PROJECT_STRUCTURE.md`
- **Component Details**: Check individual component comments
- **State Management**: Review `src/context/AppContext.jsx`
- **Styling**: Check `src/styles/globals.css`

## Version Info

- React: 18.3.0
- React Router: 6.20.0
- Vite: 5.0.0
- Node: 18.0.0 or higher

Happy coding! 🚀
