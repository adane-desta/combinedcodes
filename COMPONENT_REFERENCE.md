# Component Reference Guide

## Table of Contents
1. [Layout Components](#layout-components)
2. [Common Components](#common-components)
3. [Veterinarian Components](#veterinarian-components)
4. [Farmer Components](#farmer-components)
5. [Page Components](#page-components)

---

## Layout Components

### Layout.jsx
**Path:** `src/components/Layout/Layout.jsx`

Main wrapper component that provides the overall page structure.

**Props:**
- `children` - Page content to display

**Usage:**
```jsx
import Layout from './components/Layout/Layout'

<Layout>
  <YourPageContent />
</Layout>
```

**Features:**
- ✅ Responsive sidebar and header
- ✅ Dynamic navigation based on user role
- ✅ Mobile hamburger menu
- ✅ User profile section

---

### Header.jsx
**Path:** `src/components/Layout/Header.jsx`

Top navigation bar with user information and actions.

**Features:**
- Logo and branding
- User profile dropdown
- Logout functionality
- Notifications badge
- Search (ready for integration)
- Responsive mobile menu

**Styling:**
- Gradient background
- Sticky positioning
- Smooth animations
- Mobile responsive

---

### Sidebar.jsx
**Path:** `src/components/Layout/Sidebar.jsx`

Left navigation menu that changes based on user role.

**Dynamic Routes:**

**Veterinarian Routes:**
- Appointments
- Questions
- News & Events
- Resources
- Account

**Farmer Routes:**
- Animals
- Appointments
- Questions
- News
- Market Prices
- Account

**Features:**
- ✅ Role-based menu items
- ✅ Active route highlighting
- ✅ Icon support
- ✅ Collapsible on mobile
- ✅ Smooth transitions

**Styling:**
- Blue gradient theme
- Hover effects
- Active indicators
- Mobile responsive

---

## Common Components

### StatCard.jsx
**Path:** `src/components/Common/StatCard.jsx`

Reusable card component for displaying statistics.

**Props:**
```jsx
{
  icon: "📊",           // Icon/emoji
  label: "Appointments", // Card title
  value: "12",          // Main value
  trend: "+5%",         // Optional trend text
  bgColor: "#e0f2fe"    // Background color
}
```

**Usage:**
```jsx
import StatCard from './components/Common/StatCard'

<StatCard
  icon="📅"
  label="Pending Appointments"
  value="5"
  trend="+2 today"
  bgColor="#fef3c7"
/>
```

**Features:**
- ✅ Customizable icon
- ✅ Trend indicator
- ✅ Flexible background colors
- ✅ Responsive design
- ✅ Hover animations

---

### PageHeader.jsx
**Path:** `src/components/Common/PageHeader.jsx`

Page title and description with optional action buttons.

**Props:**
```jsx
{
  title: "Animals",
  description: "Manage and track your farm animals",
  icon: "🐄",
  actionButton: {
    label: "Add Animal",
    onClick: handleAddAnimal,
    icon: "+"
  }
}
```

**Usage:**
```jsx
import PageHeader from './components/Common/PageHeader'

<PageHeader
  title="My Animals"
  description="View and manage all farm animals"
  icon="🐄"
  actionButton={{
    label: "Add New Animal",
    onClick: () => setShowModal(true)
  }}
/>
```

**Features:**
- ✅ Icon support
- ✅ Subtitle/description
- ✅ Optional action button
- ✅ Responsive layout
- ✅ Professional styling

---

### Modal.jsx
**Path:** `src/components/Common/Modal.jsx`

Reusable modal dialog for forms and confirmations.

**Props:**
```jsx
{
  isOpen: true,
  title: "Add Animal",
  onClose: handleClose,
  children: <FormContent />,
  footer: <FormButtons />
}
```

**Usage:**
```jsx
import Modal from './components/Common/Modal'

const [showModal, setShowModal] = useState(false)

<Modal
  isOpen={showModal}
  title="Add New Animal"
  onClose={() => setShowModal(false)}
>
  <form>
    <input type="text" placeholder="Animal name" />
    {/* Form fields */}
  </form>
</Modal>
```

**Features:**
- ✅ Smooth open/close animations
- ✅ Click outside to close
- ✅ Backdrop overlay
- ✅ Customizable content
- ✅ Keyboard support (ESC to close)
- ✅ Responsive sizing

---

## Veterinarian Components

### VeterinarianDashboard.jsx
**Path:** `src/components/Veterinarian/VeterinarianDashboard.jsx`

Main dashboard for veterinarians showing overview and stats.

**Features:**
- ✅ Key metrics display (stats cards)
- ✅ Quick actions
- ✅ Pending appointments count
- ✅ Recent questions
- ✅ Response rate
- ✅ Professional info display

**Routes:**
- `/dashboard/veterinarian` - Main dashboard
- `/dashboard/veterinarian/appointments` - Appointments
- `/dashboard/veterinarian/questions` - Questions
- `/dashboard/veterinarian/news` - News & Events
- `/dashboard/veterinarian/resources` - Resources
- `/dashboard/veterinarian/account` - Settings

---

### VetAppointments.jsx
**Path:** `src/components/Veterinarian/VetAppointments.jsx`

Manage appointments from farmers.

**Features:**
- ✅ List of pending appointments
- ✅ Accept/Reject buttons
- ✅ Farmer information
- ✅ Appointment details (date, animal type)
- ✅ Email notifications
- ✅ Appointment history

**Actions from Context:**
```jsx
acceptAppointment(id)  // Accept appointment
rejectAppointment(id)  // Reject appointment
```

---

### VetQuestions.jsx
**Path:** `src/components/Veterinarian/VetQuestions.jsx`

Answer questions from farmers.

**Features:**
- ✅ Display farmer questions
- ✅ Rich text editor for replies
- ✅ Reply functionality
- ✅ Mark as answered
- ✅ Question history
- ✅ Farmer contact info

**Data Structure:**
```jsx
{
  id: 1,
  farmerId: "farmer-001",
  farmerName: "John Doe",
  question: "My cow has fever...",
  date: "2024-02-10",
  reply: null,
  status: "pending"
}
```

---

### VetAccount.jsx
**Path:** `src/components/Veterinarian/VetAccount.jsx`

Veterinarian profile and settings.

**Features:**
- ✅ Profile picture upload
- ✅ Personal information
- ✅ License information
- ✅ Specializations
- ✅ Contact details
- ✅ Availability settings

---

## Farmer Components

### FarmerDashboard.jsx
**Path:** `src/components/Farmer/FarmerDashboard.jsx`

Main dashboard for farmers with quick actions.

**Features:**
- ✅ Quick action buttons
- ✅ Key metrics (animals, appointments)
- ✅ Recent activity
- ✅ Health alerts
- ✅ Upcoming appointments
- ✅ Market price preview

---

### FarmerAnimals.jsx
**Path:** `src/components/Farmer/FarmerAnimals.jsx`

Complete animal management system.

**Features:**
- ✅ List all farm animals
- ✅ Add new animal (modal form)
- ✅ Edit animal details
- ✅ Delete animal
- ✅ View health records
- ✅ Track vaccinations
- ✅ Record diseases/treatments
- ✅ Generate health reports

**Animal Data Structure:**
```jsx
{
  id: 1,
  name: "Bessie",
  type: "Cow",
  breed: "Holstein",
  age: 3,
  weight: 650,
  health: "Healthy",
  vaccinations: ["FMD", "PPR"],
  lastCheckup: "2024-02-15",
  notes: "Producing well"
}
```

**Actions:**
```jsx
addAnimal(animalData)
updateAnimal(id, animalData)
deleteAnimal(id)
```

---

### FarmerAppointments.jsx
**Path:** `src/components/Farmer/FarmerAppointments.jsx`

Book and manage veterinary appointments.

**Features:**
- ✅ View available veterinarians
- ✅ Book appointments
- ✅ Select date and time
- ✅ Describe animal problem
- ✅ Track appointment status
- ✅ Cancel appointments
- ✅ Appointment history
- ✅ Receive confirmations

**Appointment Data:**
```jsx
{
  id: 1,
  veterinarian: "Dr. Smith",
  date: "2024-02-20",
  time: "10:00 AM",
  animal: "Bessie (Cow)",
  reason: "General checkup",
  status: "scheduled"
}
```

---

### FarmerQuestions.jsx
**Path:** `src/components/Farmer/FarmerQuestions.jsx`

Ask veterinarians questions.

**Features:**
- ✅ Ask new questions
- ✅ Rich text editor
- ✅ Attach files
- ✅ Tag animals
- ✅ View responses
- ✅ Question history
- ✅ Follow-up questions

**Question Form:**
```jsx
{
  animalId: 1,
  title: "Why is my cow limping?",
  question: "Detailed description...",
  attachments: [],
  urgent: false
}
```

---

### FarmerMarket.jsx
**Path:** `src/components/Farmer/FarmerMarket.jsx`

View livestock market prices.

**Features:**
- ✅ Current prices for cattle, goats, chickens
- ✅ Price trends (chart ready)
- ✅ Historical data
- ✅ Price alerts (setup ready)
- ✅ Regional prices
- ✅ Market news

**Market Data:**
```jsx
{
  commodity: "Cattle",
  price: 45000,
  unit: "per animal",
  trend: "+5%",
  lastUpdate: "2024-02-15"
}
```

---

### FarmerAccount.jsx
**Path:** `src/components/Farmer/FarmerAccount.jsx`

Farmer profile and farm management.

**Features:**
- ✅ Profile picture upload
- ✅ Personal information
- ✅ Farm details
- ✅ Location information
- ✅ Contact details
- ✅ Bank information (payment ready)

---

## Page Components

### Landing.jsx
**Path:** `src/pages/Landing.jsx`

Marketing landing page.

**Sections:**
- Navigation bar
- Hero section
- Features (6 cards)
- How it works (3 steps)
- Veterinarian section
- Farmer section
- Pricing (3 tiers)
- CTA section
- Footer

**Features:**
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Conversion focused
- ✅ Professional styling
- ✅ Mobile optimized

---

### RoleSelection.jsx
**Path:** `src/pages/RoleSelection.jsx`

Choose between Veterinarian and Farmer roles.

**Features:**
- ✅ Two role cards
- ✅ Role descriptions
- ✅ Feature lists for each role
- ✅ Navigation to dashboard
- ✅ Back button to home

---

### Dashboard.jsx
**Path:** `src/pages/Dashboard.jsx`

Main dashboard page with nested routing.

**Structure:**
```jsx
<Layout>
  <Routes>
    <Route index element={<MainDashboard />} />
    <Route path="appointments" element={<Appointments />} />
    <Route path="questions" element={<Questions />} />
    {/* More routes */}
  </Routes>
</Layout>
```

**Features:**
- ✅ Role detection
- ✅ Nested routing
- ✅ Sidebar integration
- ✅ Header integration
- ✅ Protected layout

---

### NotFound.jsx
**Path:** `src/pages/NotFound.jsx`

404 error page.

**Features:**
- ✅ Error message
- ✅ Back home button
- ✅ Professional styling
- ✅ Helpful suggestions

---

## Styling with CSS Modules

### Import Pattern
```jsx
import styles from './ComponentName.module.css'

<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

### Global CSS Variables
Available from `globals.css`:

**Colors:**
```css
--primary-color: #2563eb
--accent-color: #0891b2
--success-color: #10b981
--error-color: #ef4444
--warning-color: #f59e0b
--text-primary: #1a1a1a
--text-secondary: #666
--bg-light: #f8f9fa
```

**Spacing:**
```css
--spacing-1: 0.25rem
--spacing-2: 0.5rem
--spacing-4: 1rem
--spacing-6: 1.5rem
--spacing-8: 2rem
```

**Shadows & Effects:**
```css
--shadow-sm: 0 2px 4px rgba(0,0,0,0.1)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--transition-base: 0.3s ease
```

---

## State Management (useApp Hook)

**Import:**
```jsx
import { useApp } from '../context/AppContext'
```

**Usage:**
```jsx
const {
  userRole,
  appointments,
  addAppointment,
  acceptAppointment,
  rejectAppointment,
  // ... more actions
} = useApp()
```

**Available in Context:**
- `userRole` - Current user role
- `appointments` - List of appointments
- `questions` - List of questions
- `animals` - List of farm animals (farmer only)
- `marketPrices` - Current market prices
- Various action functions

---

## Component Composition Example

```jsx
import React from 'react'
import Layout from '../components/Layout/Layout'
import PageHeader from '../components/Common/PageHeader'
import StatCard from '../components/Common/StatCard'
import { useApp } from '../context/AppContext'
import styles from './MyPage.module.css'

export default function MyPage() {
  const { appointments, animals } = useApp()

  return (
    <Layout>
      <div className={styles.container}>
        <PageHeader
          title="Dashboard"
          description="Welcome to your dashboard"
          icon="📊"
        />
        
        <div className={styles.grid}>
          <StatCard
            icon="📅"
            label="Appointments"
            value={appointments.length}
          />
          <StatCard
            icon="🐄"
            label="Animals"
            value={animals.length}
          />
        </div>
      </div>
    </Layout>
  )
}
```

---

## Best Practices

### 1. Component Organization
- Keep components focused and small
- One responsibility per component
- Extract reusable logic

### 2. Props
- Use destructuring for props
- Document required props
- Provide default values

### 3. Styling
- Use CSS Modules exclusively
- Follow naming conventions
- Use global variables
- Keep styles scoped

### 4. State
- Use AppContext for global state
- Use useState for local state
- Keep state as minimal as possible

### 5. Performance
- Use useCallback for handlers
- Avoid unnecessary re-renders
- Memoize expensive computations
- Lazy load heavy components

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Installation
npm install             # Install dependencies
npm install package     # Install new package
npm uninstall package   # Remove package

# Cleanup
npm cache clean --force # Clear cache
rm -rf node_modules     # Remove modules
```

---

## Troubleshooting

### Component Not Rendering
- Check import paths
- Verify component export
- Check prop values
- Review console errors

### Styles Not Applied
- Check CSS Module import
- Verify class name syntax
- Check file naming (*.module.css)
- Clear browser cache

### State Not Updating
- Use useApp hook correctly
- Check context provider
- Verify state actions
- Check console for errors

### Routes Not Working
- Verify route path
- Check Router setup
- Ensure component imports
- Check dynamic route parameters

---

This reference guide provides quick access to all components and their usage. For detailed implementation, check individual component files and their comments.
