import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column as ColumnModel, Task } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-column',
  imports: [TaskCard],
  templateUrl: './column.html',
  styleUrls: ['./column.scss'],
})
export class Column {
  @Input() column!: ColumnModel;
  @Input() tasks: Task[] = [];
  @Output() addTask = new EventEmitter<number>();      // 👈 Подія: додати задачу (передаємо ID колони)
  @Output() editTask = new EventEmitter<Task>();        // 👈 Подія: редагувати задачу
  @Output() deleteTask = new EventEmitter<number>();    // 👈 Подія: видалити задачу (число)

  // Коли натиснули кнопку "Add Task"
  onAddTask(): void {
    this.addTask.emit(this.column.id);
  }

  // Отримуємо подію від TaskCard та передаємо вище
  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  // Отримуємо подію від TaskCard та передаємо вище
  onDeleteTask(taskId: number): void {
    this.deleteTask.emit(taskId);
  }
}
