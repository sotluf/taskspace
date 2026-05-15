import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Column as ColumnModel, Task } from '../../models/task.model';
import { Column } from '../column/column';
import { TaskModal } from '../task-modal/task-modal';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [CommonModule, AsyncPipe, Column, TaskModal],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  columns$: Observable<ColumnModel[]>;
  tasks$: Observable<Task[]>;

  // 👇 Стан модалки
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

  // 👇 Обробляємо подію "Додати задачу"
  onAddTask(columnId: number): void {
    this.editingTask = null;  // Чистимо задачу при створенні нової
    this.editingColumnId = columnId;
    this.isModalOpen = true;
  }

  // 👇 Обробляємо подію "Редагувати задачу"
  onEditTask(task: Task): void {
    this.editingTask = task;
    this.editingColumnId = task.columnId;
    this.isModalOpen = true;
  }

  // 👇 Обробляємо подію "Видалити задачу"
  // 👇 Обробляємо подію "Видалити задачу"
  onDeleteTask(taskId: number): void {
    if (confirm('Ви впевнені, що хочете видалити цю задачу?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Задача видалена');
        },
        error: (err) => console.error('Помилка при видаленні', err),
      });
    }
  }

  // 👇 Обробляємо збереження форми
  onSaveTask(taskData: Task): void {
    if (this.editingTask) {
      // Редагування існуючої задачи
      this.taskService.updateTask(Number(taskData.id), taskData).subscribe({
        next: () => {
          console.log('Задача оновлена');
          this.isModalOpen = false;
        },
        error: (err) => console.error('Помилка при оновленні', err),
      });
    } else {
      // Створення нової задачи
      const newTask = { ...taskData, columnId: this.editingColumnId! };
      this.taskService.addTask(newTask as any).subscribe({
        next: () => {
          console.log('Задача створена');
          this.isModalOpen = false;
        },
        error: (err) => console.error('Помилка при створенні', err),
      });
    }
  }

  // 👇 Обробляємо скасування модалки
  onCancelModal(): void {
    this.isModalOpen = false;
    this.editingTask = null;
  }
}