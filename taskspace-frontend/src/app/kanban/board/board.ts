import { Component, OnInit } from '@angular/core';
import { Column, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board implements OnInit {
  columns: Column[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getColumns().subscribe((columns) => {
      this.columns = columns;
    });

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getTasksForColumn(columnId: number): Task[] {
    return this.tasks.filter((t) => t.columnId === columnId);
  }
}
