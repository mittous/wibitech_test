// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

// import { TaskProvider } from "@/context/TaskContext";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/ui/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="sm:px-[50px] px-[15px]">
        

        <AuthProvider>
          {/* <TaskProvider> */}
          <Navbar />
          {children}
          <ToastContainer />
          {/* </TaskProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
