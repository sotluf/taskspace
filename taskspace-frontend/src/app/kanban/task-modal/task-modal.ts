import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModal implements OnInit, OnChanges {
  @Input() isOpen: boolean = false; 
  @Input() editingTask: Task | null = null;
  @Output() saveTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  taskForm!: FormGroup;
  editingTaskId: number | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      if (this.editingTaskId) {
        taskData.id = this.editingTaskId;
      }
      this.saveTask.emit(taskData);
      this.resetForm();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.taskForm.reset();
    this.editingTaskId = null;
  }

  ngOnChanges(): void {
    if (this.editingTask && this.isOpen) {
      this.editingTaskId = this.editingTask.id || null;
      this.taskForm.patchValue({
        title: this.editingTask.title,
        description: this.editingTask.description,
      });
    }
  }
}
