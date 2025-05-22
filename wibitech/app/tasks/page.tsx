'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import PageHeader from '@/components/ui/TasksHeader';


function TasksPage() {
	const { user } = useAuth();




	return (
		<div className="pt-[150px]">
			<PageHeader
				title="Welcome"
				highlight={user?.username}
				subtitle={`Your team got ${user?.role} tasks to do.`}
			/>
		</div>
	)
}

export default TasksPage
