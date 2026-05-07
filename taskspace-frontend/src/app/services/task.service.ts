import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, Column, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.getMockTasks());
  private columnsSubject = new BehaviorSubject<Column[]>(this.getMockColumns());

  public tasks$ = this.tasksSubject.asObservable();
  public columns$ = this.columnsSubject.asObservable();

  // get all tasks
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // get task by id
  getTaskById(id: number): Observable<Task | undefined> {
    return new Observable((observer) => {
      const task = this.tasksSubject.value.find((t) => t.id === id);
      observer.next(task);
      observer.complete();
    });
  }

  // get all columns
  getColumns(): Observable<Column[]> {
    return this.columns$;
  }

  // add new task
  addTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    return new Observable((observer) => {
      const newTask: Task = {
        ...task,
        id: this.generateId(),
        createdAt: new Date(),
      };
      const currentTasks = this.tasksSubject.value;
      this.tasksSubject.next([...currentTasks, newTask]);
      observer.next(newTask);
      observer.complete();
    });
  }

  // update task
  updateTask(id: number, updatedTask: Partial<Task>): Observable<Task | undefined> {
    return new Observable((observer) => {
      const currentTasks = this.tasksSubject.value;
      const index = currentTasks.findIndex((t) => t.id === id);

      if (index !== -1) {
        const updatedTasks: Task = {
          ...currentTasks[index],
          ...updatedTask,
          updatedAt: new Date(),
        };
        const newTasks = [...currentTasks];
        newTasks[index] = updatedTasks;
        this.tasksSubject.next(newTasks);
        observer.next(updatedTasks);
      } else {
        observer.next(undefined);
      }
      observer.complete();
    });
  }

  // delete task
  deleteTask(id: number): Observable<boolean> {
    return new Observable((observer) => {
      const currentTasks = this.tasksSubject.value;
      const filtered = currentTasks.filter((t) => t.id !== id);

      if (filtered.length !== currentTasks.length) {
        this.tasksSubject.next(filtered);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  // get tasks by status
  getTasksByStatus(status: TaskStatus): Observable<Task[]> {
    return new Observable((observer) => {
      const filtered = this.tasksSubject.value.filter((t) => t.status === status);
      observer.next(filtered);
      observer.complete();
    });
  }

  // get tasks by column
  getTasksByColumn(columnId: number): Observable<Task[]> {
    return new Observable((observer) => {
      const filtered = this.tasksSubject.value.filter((t) => t.columnId === columnId);
      observer.next(filtered);
      observer.complete();
    });
  }

  // generate new id for task
  private generateId(): number {
    const tasks = this.tasksSubject.value;
    return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  }

  // Mock Data

  private getMockColumns(): Column[] {
    return [
      {
        id: 1,
        name: 'To Do',
        status: TaskStatus.to_do,
        tasks: [],
      },
      {
        id: 2,
        name: 'In Progress',
        status: TaskStatus.in_progress,
        tasks: [],
      },
      {
        id: 3,
        name: 'In Review',
        status: TaskStatus.in_review,
        tasks: [],
      },
      {
        id: 4,
        name: 'Done',
        status: TaskStatus.done,
        tasks: [],
      },
    ];
  }

  private getMockTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'Add UI Mockups',
        description: '...',
        status: TaskStatus.done,
        columnId: 4,
        position: 0,
        createdAt: new Date('2026-05-01'),
        updatedAt: new Date('2026-05-03'),
      },
      {
        id: 2,
        title: 'Set up Database',
        description: '///',
        status: TaskStatus.in_progress,
        columnId: 2,
        position: 0,
        createdAt: new Date('2026-05-02'),
        updatedAt: new Date('2026-05-05'),
      },
      {
        id: 3,
        title: 'API for managing users',
        description: '---',
        status: TaskStatus.in_progress,
        columnId: 2,
        position: 1,
        createdAt: new Date('2026-05-02'),
      },
      {
        id: 4,
        title: 'Authentication',
        description: '+++',
        status: TaskStatus.to_do,
        columnId: 1,
        position: 0,
        createdAt: new Date('2026-05-04'),
      },
      {
        id: 5,
        title: 'API Testing',
        description: '999',
        status: TaskStatus.to_do,
        columnId: 1,
        position: 1,
        createdAt: new Date('2026-05-04'),
      },
      {
        id: 6,
        title: 'Frontend Development',
        description: '000',
        status: TaskStatus.in_review,
        columnId: 3,
        position: 0,
        createdAt: new Date('2026-05-03'),
      },
    ];
  }
}
