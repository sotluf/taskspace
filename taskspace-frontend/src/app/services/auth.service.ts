import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, RegisterRequest, LoginRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  public currentUser$ = this.currentUserSubject.asObservable();

  // is user logged in
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // user registration
  register(data: RegisterRequest): Observable<User> {
    return new Observable((observer) => {
      const newUser: User = {
        id: Date.now(),
        name: data.name,
        username: data.username,
        email: data.email,
        createdAt: new Date(),
      };
      this.saveUserToStorage(newUser);
      this.currentUserSubject.next(newUser);
      observer.next(newUser);
      observer.complete();
    });
  }

  // user login
  login(data: LoginRequest): Observable<User> {
    return new Observable((observer) => {
      const MockUser: User = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: data.email,
        createdAt: new Date(),
      };
      this.saveUserToStorage(MockUser);
      this.currentUserSubject.next(MockUser);
      observer.next(MockUser);
      observer.complete();
    });
  }

  // user logout
  logout(): void {
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('current_user');
    return stored ? JSON.parse(stored) : null;
  }
}
