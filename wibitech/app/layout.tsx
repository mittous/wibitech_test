// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
// import { TaskProvider } from "@/context/TaskContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* <TaskProvider> */}
            {children}
          {/* </TaskProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
