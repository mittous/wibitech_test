'use client';

import TaskList from '@/components/ui/TaskList';
import AddTaskModal from '@/components/ui/AddTaskModal';
import { useAuth } from '@/context/AuthContext';
import { useUsers } from '@/context/UserContext';
import TasksHeader from '@/components/ui/TasksHeader';
import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';

const TasksPage = () => {
	const { user } = useAuth();
	const { users } = useUsers();
	const [isAddModalOpen, setAddModalOpen] = useState(false);
	const { tasks, loading } = useTasks();

	const tasksNumber = user?.role === 'admin' ? tasks.length : tasks.filter(task => task.assignedTo === user?.id).length;
	return (
		<div className="pt-[150px]">
			<TasksHeader
				title="Welcome"
				highlight={user?.username}
				subtitle={`Your team got ${tasksNumber} tasks to do.`}
			/>

			{/* Task List with Add New Task trigger */}
			<TaskList onAddTask={() => setAddModalOpen(true)} />

			{/* Modal for adding a task */}
			<AddTaskModal
				open={isAddModalOpen}
				onClose={() => setAddModalOpen(false)}
				users={users.map(user => user.username)}
			/>
		</div>
	);
};

export default TasksPage;
