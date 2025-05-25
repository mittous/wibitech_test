"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ImageWrapper from "@/components/ui/ImageWrapper";
import TruncatedText from "@/components/ui/common/TruncatedText";

export function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();
  
  // Determine avatar image based on user role
  const isAdmin = user?.role === 'admin';
  const avatarSrc = isAdmin ? "/ProfileAvatar/adminAvatar.png" : "/ProfileAvatar/userAvatar.png";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const isDarkPref = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkPref);
    document.documentElement.classList.toggle("dark", isDarkPref);
  }, []);

  const toggleDark = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
        aria-label="Toggle user menu"
      >
        <ImageWrapper
          src={avatarSrc}
          alt={isAdmin ? "Admin Avatar" : "User Avatar"}
          width={40}
          height={40}
          className="rounded-full border border-gray-300 dark:border-zinc-600"
          isSvg={false}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-zinc-700">
            <TruncatedText
              text={user?.username || ''}
              className="text-sm font-medium"
              maxWidth={{
                default: 'max-w-[160px]',
              }}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={toggleDark}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2 text-red-500"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
