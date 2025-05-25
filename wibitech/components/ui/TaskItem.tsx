import React, { useState } from 'react';
import Link from 'next/link';
import { FiChevronUp, FiMove } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { Task } from '@/types/task';
import TruncatedText from '@/components/ui/common/TruncatedText';
import ImageWrapper from '@/components/ui/ImageWrapper';

interface TaskItemProps {
	task: Task;
	onEdit: (taskId: string) => void;
	onDelete: (taskId: string) => void;
	onToggleStatus: (taskId: string) => void;
	loading: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onEdit,
	onDelete,
	onToggleStatus,
	loading
}) => {
	const { user } = useAuth();
	const [expanded, setExpanded] = useState(false);
	const isAdmin = user?.role === 'admin';
	const isCompleted = task.status === 'done';

	const hasActions = (!isCompleted) || (isAdmin);

	return (
		<div className="relative flex items-center justify-between bg-[#F5F7F9] dark:bg-gray-800 p-5 px-5 py-3.5 rounded-2xl group">
			{/* Drag handle indicator */}
			<div className="opacity-0 group-hover:opacity-50 hover:opacity-100 transition-opacity mr-2 text-gray-400 dark:text-gray-500">
				<FiMove size={16} />
			</div>
			
			{isCompleted && (
				<div className="flex items-center justify-center p-[10px] mr-[10px]">
					<ImageWrapper src="/svg/Checked.svg" alt="checked" width={20} height={20} isSvg={true} />
				</div>
			)}
			<div className="flex-1 gap-2">
				<Link href={`/users/${task.assignedTo}`}>
					<TruncatedText
						text={`@${task.assignedTo}`}
						className="text-xs text-sky-500 dark:text-blue-400 leading-3 font-normal mb-1 hover:underline cursor-pointer"
						maxWidth={{
							default: 'max-w-[100px]',
							xs: 'xs:max-w-[120px]',
							sm: 'sm:max-w-[150px]'
						}}
					/>
				</Link>

				<TruncatedText
					text={task.title}
					className={`text-black dark:text-gray-100 text-lg font-semibold ${isCompleted ? 'line-through decoration-[1.2px]' : ''}`}
					maxWidth={{
						default: 'max-w-[200px]',
						xs: 'xs:max-w-[250px]',
						sm: 'sm:max-w-[300px]',
						md: 'md:max-w-[350px]'
					}}
				/>

				<TruncatedText
					text={task.description}
					className={`text-[#8c9bb7] dark:text-[#8c9bb7] text-sm ${isCompleted ? 'line-through decoration-[1px] decoration-gray-400' : ''}`}
					maxWidth={{
						default: 'max-w-[150px]',
						xs: 'xs:max-w-[200px]',
						sm: 'sm:max-w-[250px]',
						md: 'md:max-w-[300px]',
						lg: 'lg:max-w-[350px]'
					}}
				/>
			</div>

			{/* Desktop actions (visible on hover) */}
			<div className="hidden md:flex items-center space-x-[10px] ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
				{!isCompleted && (
					<button
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
						title="Edit"
						onClick={() => onEdit(task.id)}
					>
						<ImageWrapper src="/svg/Edit_Icon.svg" alt="Edit" width={20} height={20} isSvg={true} />
					</button>
				)}

				{isAdmin && (
					<button
						className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
						title="Delete"
						onClick={() => onDelete(task.id)}
						disabled={loading}
					>
						<ImageWrapper src="/svg/Delet_Icon.svg" alt="Delete" width={20} height={20} isSvg={true} />
					</button>
				)}

				{!isCompleted && (
					<button
						className="ml-2 px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-150 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
						onClick={() => onToggleStatus(task.id)}
						disabled={loading}
					>
						<div className="flex items-center gap-2">
							<ImageWrapper src="/svg/CheckCircle_Icon.svg" alt="Check" width={24} height={24} isSvg={true} />
							Done
						</div>
					</button>
				)}
			</div>

			{/* Mobile toggle button - only show if any actions are available */}
			{hasActions && (
				<button
					className="md:hidden absolute bottom-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
					onClick={() => setExpanded(!expanded)}
					title="Toggle actions"
				>
					<FiChevronUp
						className={`transition-transform duration-200 ${expanded ? 'rotate-0' : 'rotate-180'}`}
						size={16}
					/>
				</button>
			)}

			{/* Mobile expanded actions */}
			{expanded && (
				<div className="md:hidden absolute bottom-12 right-2 flex flex-row bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 space-x-[10px]">
					{/* Edit button - only show if task is not completed */}
					{!isCompleted && (
						<button
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
							title="Edit"
							onClick={() => onEdit(task.id)}
						>
							<ImageWrapper src="/svg/Edit_Icon.svg" alt="Edit" width={20} height={20} isSvg={true} />
						</button>
					)}

					{/* Delete button - only show for admin users */}
					{isAdmin && (
						<button
							className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
							title="Delete"
							onClick={() => onDelete(task.id)}
							disabled={loading}
						>
							<ImageWrapper src="/svg/Delet_Icon.svg" alt="Delete" width={20} height={20} isSvg={true} />
						</button>
					)}

					{/* Done button - only show if task is not completed */}
					{!isCompleted && (
						<button
							title="Done"
							className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
							onClick={() => onToggleStatus(task.id)}
							disabled={loading}
						>
							<ImageWrapper src="/svg/CheckCircle_Icon.svg" alt="Check" width={24} height={24} isSvg={true} />
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default TaskItem; 