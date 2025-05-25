import { AuthProvider } from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/ui/Navbar";
import { TaskProvider } from "@/context/TaskContext";
import { UserProvider } from "@/context/UserContext";
import { Inter } from 'next/font/google';

// Initialize Inter font with Latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`sm:px-[100px] px-[15px] font-sans ${inter.className}`}>
        <AuthProvider>
          <TaskProvider>
            <UserProvider>
              <Navbar />
              {children}
            </UserProvider>
          </TaskProvider>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ fontSize: '0.875rem' }}
            toastStyle={{ 
              maxWidth: '300px',
              padding: '8px 12px',
              fontSize: '0.875rem'
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
