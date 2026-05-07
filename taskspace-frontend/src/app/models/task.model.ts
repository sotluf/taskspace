export enum TaskStatus {
  to_do = 'To Do',
  in_progress = 'In Progress',
  in_review = 'In Review',
  done = 'Done',
}

export interface Column { 
  id: number;
  name: string;
  status: TaskStatus;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  columnId: number;
  position: number;
  createdAt: Date;
  updatedAt?: Date;
}
