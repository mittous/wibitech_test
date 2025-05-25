import React from 'react'
import ImageWrapper from '@/components/ui/ImageWrapper'

function TaskiLogo() {
	return (
		<div className="flex items-center justify-center">
			<ImageWrapper
				src="/svg/Logo.svg"
				alt="taski Logo"
				width={81}
				height={28}
				className="dark:hidden"
				isSvg={true}
				
			/>
			<ImageWrapper
				src="/svg/Logo_darkMode.svg"
				alt="taski Logo"
				width={81}
				height={28}
				className="dark:block hidden"
				isSvg={true}
			/>
		</div>
	)
}

export default TaskiLogo
