import { Component, Input } from '@angular/core';
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
}
