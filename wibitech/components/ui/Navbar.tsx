// components/Navbar.tsx
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import TaskiLogo from "./TaskiLogo";
import { useAuth } from "@/context/AuthContext";
import { FormTitle } from "./FormTitle";

export default function Navbar() {
	const pathname = usePathname();
	const [isDark, setIsDark] = useState(false);
	const { user } = useAuth();
	// Toggle dark mode
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

	const isAuthPage = pathname.includes("/login") || pathname.includes("/register");

	console.log("isAuthPage", isAuthPage);
	return (
		<nav className="w-full  py-[50px] flex justify-between items-center">
			{isAuthPage ? (
				<div />
			) : (
				<TaskiLogo />
			)}

			<div className="flex items-center justify-center text-center gap-4">
				{isAuthPage ? (
					<button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
						{isDark ? <Sun size={20} /> : <Moon size={20} />}
					</button>
				) : (

					<FormTitle title={user?.username} className="text-black dark:text-white text-lg font-semibold text-center" />
				)}

				{!isAuthPage && user && (
					<div className="flex items-center gap-2">
						<Image
							src="/adminAvatar.svg"
							alt="Avatar"
							width={45}
							height={45}
							className="rounded-full"
						/>
					</div>
				)}
			</div>
		</nav>
	);
}
