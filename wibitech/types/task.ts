export type TaskStatus = 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
  completed: boolean;
}

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  status: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => Promise<void>;
  editTask: (id: string, updatedFields: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

export interface NewTaskPayload extends Omit<Task, 'id' | 'completed'> {
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
} 