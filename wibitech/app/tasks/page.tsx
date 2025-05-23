'use client';

import TaskList from '@/components/ui/TaskList';
import AddTaskModal from '@/components/ui/AddTaskModal';
import { useAuth } from '@/context/AuthContext';
import { useUsers } from '@/context/UserContext';
import TasksHeader from '@/components/ui/TasksHeader';
import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { Task } from '@/context/TaskContext';

const TasksPage = () => {
	const { user } = useAuth();
	const { users } = useUsers();
	const [isAddModalOpen, setAddModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const { tasks, loading } = useTasks();
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

	const tasksNumber = user?.role === 'admin' ? tasks.length : tasks.filter(task => task.assignedTo === user?.username).length;
	
	const handleEditTask = (taskId: string) => {
		const task = tasks.find(t => t.id === taskId);
		if (task) {
			setTaskToEdit(task);
			setEditModalOpen(true);
		}
	};
	
	const handleCloseModal = () => {
		setAddModalOpen(false);
		setEditModalOpen(false);
		setTaskToEdit(null);
	};
	
	return (
		<div className="pt-[150px]">
			<TasksHeader
				title="Welcome"
				highlight={user?.username}
				subtitle={`Your team got ${tasksNumber} tasks to do.`}
			/>

			{/* Task List with Add New Task trigger */}
			<TaskList onAddTask={() => setAddModalOpen(true)} onEdit={handleEditTask} />

			{/* Modal for adding/editing a task */}
			<AddTaskModal
				open={isAddModalOpen || isEditModalOpen}
				onClose={handleCloseModal}
				users={users.map(user => user.username)}
				taskToEdit={taskToEdit}
			/>
		</div>
	);
};

export default TasksPage;
