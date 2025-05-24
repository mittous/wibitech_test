import { redirect } from 'next/navigation';

// This is a Server Component
export default function Home() {
  // Redirect to login page
  redirect('/login');
} 