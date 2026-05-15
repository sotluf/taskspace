import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Column as ColumnModel, Task } from '../../models/task.model';
import { Column } from '../column/column';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [CommonModule, AsyncPipe, Column],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  columns$: Observable<ColumnModel[]>;
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.columns$ = this.taskService.getColumns();
    this.tasks$ = this.taskService.getTasks();
  }

  getTasksForColumn(tasks: Task[], columnId: number): Task[] {
    return tasks.filter(t => t.columnId === columnId);
  }
}