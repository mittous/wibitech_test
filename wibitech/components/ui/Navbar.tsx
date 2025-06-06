"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import TaskiLogo from "@/components/ui/TaskiLogo";
import { useAuth } from "@/context/AuthContext";
import { UserDropdown } from "@/components/ui/UserDropdown";
import TruncatedText from "@/components/ui/common/TruncatedText";

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

	return ( 
		<nav className={`sm:px-[100px] px-[15px] py-[50px] w-full flex justify-between items-center fixed top-0 left-0 z-50  ${isAuthPage ? "" : "bg-white dark:bg-zinc-900"}`}>
			{isAuthPage ? (
				<div />
			) : (
				<TaskiLogo />
			)}

			<div className="flex items-center justify-center text-center gap-4">
				{isAuthPage && (
					<button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-600 dark:hover:bg-zinc-100 bg-zinc-100  dark:bg-gray-600 transition">
						{isDark ? <Sun size={20} /> : <Moon size={20} />}
					</button>
				)}
				{!isAuthPage && user && (
					<div className="flex items-center gap-2">
						<TruncatedText
							text={user?.username || ''}
							className="text-black dark:text-white text-lg font-semibold"
							maxWidth={{
								default: 'max-w-[100px]',
								xs: 'xs:max-w-[120px]',
								sm: 'sm:max-w-[150px]',
								md: 'md:max-w-[180px]'
							}}
						/>
						<UserDropdown />
					</div>
				)}

			</div>
		</nav>
	);
}
