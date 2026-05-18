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
  @Output() addTask = new EventEmitter<number>(); 
  @Output() editTask = new EventEmitter<Task>(); 
  @Output() deleteTask = new EventEmitter<number>();  

  onAddTask(): void {
    this.addTask.emit(this.column.id);
  }

  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  onDeleteTask(taskId: number): void {
    this.deleteTask.emit(taskId);
  }
}
