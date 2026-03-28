# Animal Health Advisory React App - Complete Project Structure

## Overview
This is a fully modular, production-ready React application that connects veterinarians with farmers for animal health advisory services. The app includes both veterinarian and farmer dashboards in a single unified React application.

## Key Features

### Architecture Highlights
- **React 18.3** with React Router 6.20 for client-side routing
- **Context API** for centralized state management
- **CSS Modules** for scoped, maintainable styling
- **Highly modular components** with single responsibility
- **Advanced React patterns**: useContext, useCallback, controlled components
- **Role-based routing** for veterinarian and farmer dashboards

## Project Structure

```
src/
├── main.jsx                    # Vite entry point
├── App.jsx                     # Main app component with routing
├── pages/
│   ├── Landing.jsx            # Landing page (homepage)
│   ├── Landing.module.css      # Landing page styles
│   ├── RoleSelection.jsx       # Role selection page
│   ├── RoleSelection.module.css # Role selection styles
│   ├── Dashboard.jsx           # Main dashboard layout
│   ├── NotFound.jsx            # 404 page
│   └── NotFound.module.css     # 404 styles
├── components/
│   ├── Layout/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Layout.module.css
│   │   ├── Header.jsx          # Top header/navbar
│   │   ├── Header.module.css
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   └── Sidebar.module.css
│   ├── Common/
│   │   ├── StatCard.jsx        # Reusable stat card component
│   │   ├── StatCard.module.css
│   │   ├── PageHeader.jsx      # Page title & description
│   │   ├── PageHeader.module.css
│   │   ├── Modal.jsx           # Modal dialog component
│   │   └── Modal.module.css
│   ├── Veterinarian/
│   │   ├── VeterinarianDashboard.jsx
│   │   ├── VeterinarianDashboard.module.css
│   │   ├── VetAppointments.jsx
│   │   ├── VetAppointments.module.css
│   │   ├── VetQuestions.jsx
│   │   ├── VetQuestions.module.css
│   │   ├── VetNews.jsx
│   │   ├── VetNews.module.css
│   │   ├── VetResources.jsx
│   │   ├── VetResources.module.css
│   │   ├── VetAccount.jsx
│   │   └── VetAccount.module.css
│   └── Farmer/
│       ├── FarmerDashboard.jsx
│       ├── FarmerDashboard.module.css
│       ├── FarmerAnimals.jsx
│       ├── FarmerAnimals.module.css
│       ├── FarmerAppointments.jsx
│       ├── FarmerAppointments.module.css
│       ├── FarmerQuestions.jsx
│       ├── FarmerQuestions.module.css
│       ├── FarmerNews.jsx
│       ├── FarmerNews.module.css
│       ├── FarmerMarket.jsx
│       ├── FarmerMarket.module.css
│       ├── FarmerAccount.jsx
│       └── FarmerAccount.module.css
├── context/
│   └── AppContext.jsx          # Global state management
├── styles/
│   └── globals.css             # Global CSS variables & themes
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

## Routing Structure

```
/                          → Landing page (homepage)
/role-selection           → Role selection (Veterinarian/Farmer)
/dashboard/veterinarian   → Veterinarian dashboard
  /dashboard/veterinarian/appointments    → Appointments
  /dashboard/veterinarian/questions       → Questions
  /dashboard/veterinarian/news            → News & Events
  /dashboard/veterinarian/resources       → Resources
  /dashboard/veterinarian/account         → Account settings

/dashboard/farmer         → Farmer dashboard
  /dashboard/farmer/animals               → Animal Management
  /dashboard/farmer/appointments          → Appointments
  /dashboard/farmer/questions             → Questions
  /dashboard/farmer/news                  → News & Updates
  /dashboard/farmer/market                → Market Prices
  /dashboard/farmer/account               → Account settings
```

## State Management (AppContext)

The `AppContext.jsx` file manages:

### State Properties
- `userRole`: Current user role ('veterinarian' or 'farmer')
- `appointments`: List of appointments
- `questions`: List of questions
- `animals`: List of farm animals (farmer only)
- `marketPrices`: Livestock market prices
- `resources`: Veterinary resources
- `notifications`: App notifications

### Actions
- `setUserRole(role)`: Set current user role
- `addAppointment(appointment)`: Add new appointment
- `acceptAppointment(id)`: Accept appointment
- `rejectAppointment(id)`: Reject appointment
- `addQuestion(question)`: Add new question
- `replyToQuestion(id, reply)`: Reply to question
- `addAnimal(animal)`: Add new animal to farm
- `updateAnimal(id, data)`: Update animal details
- `deleteAnimal(id)`: Delete animal
- Custom hooks like `useApp()` for accessing context

## Component Breakdown

### Pages
- **Landing.jsx**: Beautiful hero page showcasing the platform with features, pricing, and CTA
- **RoleSelection.jsx**: Choose between Veterinarian and Farmer roles
- **Dashboard.jsx**: Main dashboard layout that routes to role-specific components
- **NotFound.jsx**: 404 page for invalid routes

### Layout Components
- **Layout.jsx**: Wrapper component that includes Header and Sidebar
- **Header.jsx**: Top navigation bar with user info and logout
- **Sidebar.jsx**: Left navigation menu (dynamic based on user role)

### Common Components
- **StatCard.jsx**: Reusable card for displaying statistics
- **PageHeader.jsx**: Page title and description with action buttons
- **Modal.jsx**: Reusable modal dialog for forms and confirmations

### Veterinarian Components
- **VeterinarianDashboard.jsx**: Main dashboard showing key metrics and quick stats
- **VetAppointments.jsx**: Manage appointments with accept/reject functionality
- **VetQuestions.jsx**: View and respond to farmer questions
- **VetNews.jsx**: Share veterinary news and updates
- **VetResources.jsx**: Manage professional resources and guides
- **VetAccount.jsx**: Profile and account settings

### Farmer Components
- **FarmerDashboard.jsx**: Main dashboard with quick actions and animal health overview
- **FarmerAnimals.jsx**: Manage animals with detailed CRUD operations
- **FarmerAppointments.jsx**: Book and track veterinary appointments
- **FarmerQuestions.jsx**: Ask questions to veterinarians
- **FarmerNews.jsx**: View agricultural news and updates
- **FarmerMarket.jsx**: Check livestock market prices
- **FarmerAccount.jsx**: Profile and account settings

## Styling Approach

### CSS Modules
Every component has its own scoped CSS module, preventing style conflicts:
```jsx
import styles from './MyComponent.module.css'
<div className={styles.container}>...</div>
```

### Global CSS Variables
Defined in `globals.css`:
- Color palette (primary, accent, success, error, etc.)
- Typography settings
- Spacing scale
- Border radius
- Shadows
- Transitions

### Design System
- **Color Scheme**: Blue (#2563eb) as primary, Cyan (#0891b2) as accent
- **Typography**: Inter/Geist for sans-serif, consistent sizing scale
- **Spacing**: 4px base unit (0.25rem)
- **Border Radius**: 0.5rem, 1rem, 1.5rem
- **Shadows**: Subtle shadows for depth

## Advanced React Patterns Used

### 1. Context API + Custom Hook
```jsx
const { userRole, setUserRole } = useApp()
```

### 2. Nested Routing with React Router
```jsx
<Route path="/dashboard/:role/*" element={<Dashboard />} />
```

### 3. Controlled Components
All forms use controlled components with state management

### 4. useCallback Optimization
Prevents unnecessary re-renders of child components

### 5. Component Composition
Reusable components like Modal, StatCard, PageHeader

### 6. Conditional Rendering
Dynamic sidebar and features based on user role

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Key Technologies

- **React 18.3.0**: Modern UI library
- **React Router 6.20.0**: Client-side routing
- **Vite 5.0.0**: Lightning-fast build tool
- **CSS Modules**: Scoped styling
- **JavaScript (ES6+)**: Modern JavaScript features

## Mock Data

The app uses mock data from `AppContext.jsx`:
- Sample appointments
- Sample questions
- Sample animals
- Sample market prices

Replace these with API calls when connecting to a backend.

## Extensibility

### Adding New Features
1. Create component in appropriate folder
2. Create corresponding `.module.css` file
3. Add route in Dashboard.jsx or App.jsx
4. Add context actions if needed in AppContext.jsx
5. Update Sidebar.jsx for navigation

### API Integration
All data operations are in `AppContext.jsx`, making it easy to:
1. Replace mock data with API calls
2. Add authentication
3. Implement real-time updates
4. Add error handling

## Performance Optimizations
- Code splitting via React Router
- CSS Modules reduce bundle size
- useCallback prevents unnecessary renders
- Lazy loading ready for components

## Accessibility
- Semantic HTML elements
- Proper heading hierarchy
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features (no IE support)
- Mobile responsive design

## Notes
- All styling uses CSS Modules - no global CSS pollution
- Components are single-responsibility and reusable
- State is centralized in AppContext for easy debugging
- Router uses nested routes for clean URL structure
- No breaking changes between role-specific UIs

## Future Enhancements
- Backend API integration
- Authentication system
- Real-time notifications
- Video consultation support
- Mobile app version
- Advanced search and filtering
- Analytics dashboard
- Payment integration
