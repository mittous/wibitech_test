// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

// import { TaskProvider } from "@/context/TaskContext";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        

        <AuthProvider>
          {/* <TaskProvider> */}
          {children}
          <ToastContainer />
          {/* </TaskProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
