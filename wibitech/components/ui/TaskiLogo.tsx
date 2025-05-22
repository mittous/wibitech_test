import React from 'react'
import ImageWrapper from './ImageWrapper'

function TaskiLogo() {
	return (
		<div className="flex items-center justify-center">
			<ImageWrapper
				src="/logo.svg"
				alt="taski Logo"
				width={81}
				height={28}
				className="dark:hidden"
				isSvg={true}
			/>
			<ImageWrapper
				src="/logo_darkMode.svg"
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
