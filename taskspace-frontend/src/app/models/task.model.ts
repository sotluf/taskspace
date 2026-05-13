export enum TaskStatus {
  to_do = 'todo',
  in_progress = 'inprogress',
  in_review = 'inreview',
  done = 'done',
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
