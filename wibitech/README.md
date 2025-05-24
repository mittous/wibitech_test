# Wibitech Task Management System

A responsive task management application built with modern web technologies.

## Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Form Management**: React Hook Form
- **State Management**: React Context API
- **Notifications**: React Toastify
- **HTTP Client**: Axios

## Data Management

The application uses a Context-based architecture for state management:

- **AuthContext**: Manages user authentication state
- **TaskContext**: Handles task CRUD operations and state
- **UserContext**: Provides user data throughout the application

This approach creates a clean separation of concerns and allows components to access only the data they need through custom hooks like `useAuth()`, `useTasks()`, and `useUsers()`.

## API Integration

API requests are handled through a centralized Axios setup:

- Custom axios instance with base URL configuration
- Automatic token injection into request headers
- Global error handling with appropriate toasts
- Status code specific error handling (401, 403, 409, 422)
- Clean separation between API calls and UI components

## Authentication System

The application implements a secure authentication flow:

- JWT token-based authentication
- Token storage in localStorage with proper encryption
- Protected routes that redirect unauthenticated users
- Role-based access control (admin vs regular users)
- Automatic token refresh mechanism
- Session persistence across page reloads

## Key Features

### 1. Dark Mode Support
- System preference detection
- User preference toggle and persistence
- Tailwind dark mode classes for consistent styling

### 2. User Dropdown Menu
- Profile avatar display
- Dark/light mode toggle
- Secure logout functionality
- Role-based display

### 3. User Registration
- Form validation with meaningful error messages
- Role selection options
- Secure password handling

### 4. Responsive Mobile Design
- Adaptive layout for different screen sizes
- Mobile-optimized action buttons with expand/collapse functionality
- Touch-friendly controls
- Text truncation for optimal mobile display

### 5. User Profiles
- Dedicated profile pages for each user
- Task list filtered to show only assigned tasks
- User role indication with appropriate avatars
- Admin access to view any user's profile and tasks
- "My Tasks" view for personal tasks

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
