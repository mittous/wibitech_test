import { AuthProvider } from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/ui/Navbar";
import { TaskProvider } from "@/context/TaskContext";
import { UserProvider } from "@/context/UserContext";
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Taski - Task Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/svg/favicon.svg" type="image/svg+xml" sizes="any" />
      </head>
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
