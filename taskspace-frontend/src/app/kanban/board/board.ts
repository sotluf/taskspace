import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Column as ColumnModel, Task } from '../../models/task.model';
import { Column } from '../column/column';
import { TaskModal } from '../task-modal/task-modal';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [CommonModule, AsyncPipe, Column, TaskModal],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  columns$: Observable<ColumnModel[]>;
  tasks$: Observable<Task[]>;

  isModalOpen: boolean = false;
  editingTask: Task | null = null;
  editingColumnId: number | null = null;

  constructor(private taskService: TaskService) {
    this.columns$ = this.taskService.getColumns();
    this.tasks$ = this.taskService.getTasks();
  }

  getTasksForColumn(tasks: Task[], columnId: number): Task[] {
    return tasks.filter(t => t.columnId === columnId);
  }

  onAddTask(columnId: number): void {
    this.editingTask = null;
    this.editingColumnId = columnId;
    this.isModalOpen = true;
  }

  onEditTask(task: Task): void {
    this.editingTask = task;
    this.editingColumnId = task.columnId;
    this.isModalOpen = true;
  }

  onDeleteTask(taskId: number): void {
    if (confirm('Do you really want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Task deleted');
        },
        error: (err) => console.error('Error occurred while deleting task', err),
      });
    }
  }

  onSaveTask(taskData: Task): void {
    if (this.editingTask) {
      this.taskService.updateTask(Number(taskData.id), taskData).subscribe({
        next: () => {
          console.log('Task updated');
          this.isModalOpen = false;
        },
        error: (err) => console.error('Error occurred while updating task', err),
      });
    } else {
      const newTask = { ...taskData, columnId: this.editingColumnId! };
      this.taskService.addTask(newTask as any).subscribe({
        next: () => {
          console.log('Task created');
          this.isModalOpen = false;
        },
        error: (err) => console.error('Error occurred while creating task', err),
      });
    }
  }

  onCancelModal(): void {
    this.isModalOpen = false;
    this.editingTask = null;
  }
}