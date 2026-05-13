import { Routes } from '@angular/router';
import { Board } from './kanban/board/board';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'board', component: Board },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
