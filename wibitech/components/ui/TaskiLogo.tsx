import React from 'react'
import Image from 'next/image'

function TaskiLogo() {
	return (
		<div className="flex items-center justify-center">
			<Image
				src="/logo.svg"
				alt="taski Logo"
				width={81}
				height={28}
				className="dark:hidden"
				priority
			/>
			<Image
				src="/logo_darkMode.svg"
				alt="taski Logo"
				width={81}
				height={28}
				className="dark:block hidden"
				priority
			/>
		</div>
	)
}

export default TaskiLogo
