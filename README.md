# Wibitech Task Management System

A responsive task management application built with modern web technologies.


## Important Notes

### API Configuration
- The API base URL (`https://recruter-backend.vercel.app/api`) is directly hardcoded in the code rather than in a .env file to simplify testing.

### Authentication Implementation
- Authentication tokens are stored in localStorage instead of cookies, which created a limitation of checking tokens on the client side instead of server side.

### Known API Issues
1. Data fetching may take time to complete.
2. Tasks and users data might occasionally be missing and require refreshing.
3. You can register a new account directly on the website to simplify the testing process.


## Live Demo

Visit the live application: [Wibitech Task Manager](https://wibitech-test-mstl-git-main-ismail-mittous-projects.vercel.app/login)

## Technology Stack

- **Frontend Framework**: Next.js 15 with App Router
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

The frontend communicates with a documented RESTful API:

- API Docs: https://recruter-backend.vercel.app/docs/


API requests are handled through a centralized Axios setup:

- Custom axios instance with base URL configuration
- Automatic token injection into request headers
- Global error handling with appropriate toasts
- Status code specific error handling (401, 403, 409, 422)
- Clean separation between API calls and UI components

## Authentication System

The application implements a secure authentication flow:

- JWT token-based authentication
- Token storage in localStorage with proper encryption (as asked on the task)
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

### 6. Drag and Drop Task Management
- Intuitive drag and drop interface for task reordering
- Automatic placement of completed tasks at the bottom
- Visual feedback during drag operations
- Task priority management through reordering
- Persistent task order across sessions



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
