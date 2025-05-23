'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import PageHeader from '@/components/ui/TasksHeader';
import TaskList from '@/components/ui/TaskList';
import AddTaskModal from '@/components/ui/AddTaskModal';
import { useTasks } from '@/context/TaskContext';
import { useUsers } from '@/context/UserContext';

function TasksPage() {
	const { user } = useAuth();
	const { tasks } = useTasks();
	const { users } = useUsers();
	
	console.log("users", users);
	console.log("tasks", tasks);

	return (
		<div className="pt-[150px]">
			<PageHeader
				title="Welcome"
				highlight={user?.username}
				subtitle={`Your team got ${user?.role} tasks to do.`}
			/>
			<TaskList />
			<AddTaskModal
				open={false}
				onClose={function (): void { throw new Error('Function not implemented.'); }}
				users={users.map(user => user.username)}
			/>
		</div>
	)
}

export default TasksPage
