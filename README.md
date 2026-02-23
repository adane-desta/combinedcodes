# Animal Health Advisory - Modern React Application

A complete, production-ready React application that connects veterinarians with farmers for animal health advisory services. Features a beautiful marketing landing page, role-based dashboards, and advanced React architecture.

## Application Flow

1. **Landing Page** (`/`) - Marketing homepage with features, pricing, and CTA
2. **Role Selection** (`/role-selection`) - Choose Veterinarian or Farmer role
3. **Dashboard** (`/dashboard/:role/*`) - Role-specific dashboard with nested pages

## Features

### Landing Page
- **Hero Section** - Compelling introduction with call-to-action
- **Features Showcase** - 6 key benefits of the platform
- **How It Works** - 3-step process explanation
- **Role-Specific Sections** - Information for both veterinarians and farmers
- **Pricing Plans** - Free, Professional, and Enterprise tiers
- **CTA Section** - Conversion-focused call-to-action
- **Responsive Footer** - Complete footer with links and information
- **Modern Design** - Blue gradient theme with smooth animations

### Veterinarian Dashboard
- **Appointments Management** - View, accept, and reject farmer appointments
- **Question Management** - View pending farmer questions and provide replies
- **News & Events** - Post veterinary news and events
- **Resources** - Share educational resources
- **Account Settings** - Manage profile information

### Farmer Dashboard
- **Animal Management** - Add, track, and manage farm animals
- **Appointment Booking** - Book appointments with veterinarians
- **Question Management** - Ask veterinarians questions about animal health
- **Market Prices** - Check current livestock market prices
- **News & Events** - View veterinary news and events
- **Account Settings** - Manage farm profile

## Project Structure

```
src/
├── pages/
│   ├── Landing.jsx                  # Marketing landing page
│   ├── Landing.module.css
│   ├── RoleSelection.jsx            # Role selection page
│   ├── RoleSelection.module.css
│   ├── Dashboard.jsx                # Main dashboard router
│   ├── NotFound.jsx                 # 404 page
│   └── NotFound.module.css
├── components/
│   ├── Common/                      # Reusable components
│   │   ├── PageHeader.jsx
│   │   ├── PageHeader.module.css
│   │   ├── Modal.jsx
│   │   ├── Modal.module.css
│   │   ├── StatCard.jsx
│   │   └── StatCard.module.css
│   ├── Layout/                      # Layout components
│   │   ├── Layout.jsx
│   │   ├── Layout.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.module.css
│   ├── Veterinarian/                # Vet-specific components
│   │   ├── VeterinarianDashboard.jsx
│   │   ├── VeterinarianDashboard.module.css
│   │   ├── VetAppointments.jsx
│   │   ├── VetAppointments.module.css
│   │   ├── VetQuestions.jsx
│   │   ├── VetQuestions.module.css
│   │   ├── VetNews.jsx
│   │   ├── VetResources.jsx
│   │   ├── VetAccount.jsx
│   │   └── *.module.css
│   └── Farmer/                      # Farmer-specific components
│       ├── FarmerDashboard.jsx
│       ├── FarmerDashboard.module.css
│       ├── FarmerAnimals.jsx
│       ├── FarmerAnimals.module.css
│       ├── FarmerAppointments.jsx
│       ├── FarmerAppointments.module.css
│       ├── FarmerQuestions.jsx
│       ├── FarmerQuestions.module.css
│       ├── FarmerNews.jsx
│       ├── FarmerMarket.jsx
│       ├── FarmerAccount.jsx
│       └── *.module.css
├── context/
│   └── AppContext.jsx               # Global state management
├── styles/
│   └── globals.css                  # Global CSS variables & theme
├── App.jsx                          # Main app with routing
├── main.jsx                         # Vite entry point
└── index.html                       # HTML template
```

## Routing Structure

```
/                                 → Landing page
/role-selection                   → Role selection page
/dashboard/veterinarian           → Vet dashboard
  /dashboard/veterinarian/appointments  → Manage appointments
  /dashboard/veterinarian/questions     → Answer farmer questions
  /dashboard/veterinarian/news          → Share news & events
  /dashboard/veterinarian/resources     → Manage resources
  /dashboard/veterinarian/account       → Account settings

/dashboard/farmer                 → Farmer dashboard
  /dashboard/farmer/animals             → Animal management
  /dashboard/farmer/appointments        → Book appointments
  /dashboard/farmer/questions           → Ask questions
  /dashboard/farmer/news                → View news
  /dashboard/farmer/market              → Market prices
  /dashboard/farmer/account             → Account settings
```

## Technology Stack

- **React 18.3** - UI library
- **React Router 6.20** - Client-side routing
- **CSS Modules** - Scoped styling
- **Context API** - State management
- **Vite** - Build tool
- **Font Awesome** - Icons
- **Inter Font** - Typography

## Advanced React Features Used

### 1. Context API & Custom Hooks
- `AppContext.jsx` - Centralized state management for user data, animals, appointments, questions
- `useApp()` - Custom hook for accessing context values anywhere in the app

### 2. React Router
- Nested routes for role-based navigation
- Dynamic routing based on user role (veterinarian/farmer)
- URL-based state management

### 3. Component Composition
- Reusable components (StatCard, PageHeader, Modal)
- Container/Presenter pattern
- Props-based customization

### 4. CSS Modules
- Scoped styling with `.module.css` files
- No global CSS pollution
- Better maintainability

### 5. State Management
- React hooks: `useState`, `useEffect`, `useCallback`
- Form state tracking and validation
- Modal state management

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

1. **Access the app** - Open http://localhost:3000
2. **Select role** - Choose between Veterinarian or Farmer
3. **Explore dashboard** - Navigate through available sections
4. **Manage data** - Add animals, book appointments, answer questions

## Key Components Explained

### AppContext
Provides global state for:
- User data and authentication
- Animals (farmer only)
- Appointments
- Questions
- News and resources
- Notifications

### Layout System
- **Layout** - Main wrapper providing sidebar and header
- **Sidebar** - Role-based navigation menu
- **Header** - User info, logout, notifications
- Responsive design with mobile hamburger menu

### Dashboard Pages
- **Role Selection** - Initial page to choose user role
- **Dashboard** (role-specific) - Main entry point after role selection
- **Nested routes** - Different sections like Appointments, Questions, etc.

## Styling Architecture

**CSS Variables** (`globals.css`):
- `--primary-color` - Main brand color (blue for vet, green for farmer)
- `--text-primary/secondary/light` - Text colors
- `--shadow-sm/md/lg/xl` - Shadow depths
- `--radius-sm/md/lg/xl` - Border radius
- `--transition-fast/base/slow` - Animation speeds

**Module-based CSS**:
- Each component has its own `.module.css` file
- Scoped class names prevent conflicts
- Easy to maintain and modify

## Mock Data

The app includes mock data for demonstration:
- Sample veterinarian with 2 pending appointments
- Sample farmer with 5 animals and upcoming appointments
- Market prices for livestock commodities

## Features to Enhance

1. **Backend Integration** - Connect to real API endpoints
2. **Authentication** - Add real user authentication
3. **File Upload** - Implement animal images and documents
4. **Search & Filter** - Add filtering capabilities
5. **Real-time Updates** - WebSocket integration for notifications
6. **Advanced Charts** - Implement market trend charts
7. **Email Integration** - Real email sending for appointments
8. **Database** - Replace mock data with database queries

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Optimizations

- React Router lazy loading ready
- CSS Modules for efficient styling
- Context optimization with `useCallback`
- Responsive design for all devices

## Development Notes

- **No PropTypes** - Using TypeScript-ready structure
- **Accessible** - ARIA labels and semantic HTML
- **Mobile First** - Responsive design from start
- **Clean Code** - Modular, DRY principles
- **Consistent** - Unified design system

This is a production-ready foundation that can be extended with backend APIs, real authentication, and additional features as needed.
