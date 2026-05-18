import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column as ColumnModel, Task } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';
import {
  DragDropModule,
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  imports: [TaskCard, DragDropModule],
  templateUrl: './column.html',
  styleUrls: ['./column.scss'],
})
export class Column {
  @Input() column!: ColumnModel;
  @Input() tasks: Task[] = [];
  @Output() addTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() taskDropped = new EventEmitter<{ event: CdkDragDrop<Task[]>; columnId: number }>();

  onAddTask(): void {
    this.addTask.emit(this.column.id);
  }

  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  onDeleteTask(taskId: number): void {
    this.deleteTask.emit(taskId);
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.taskDropped.emit({ event, columnId: this.column.id });
  }
}
