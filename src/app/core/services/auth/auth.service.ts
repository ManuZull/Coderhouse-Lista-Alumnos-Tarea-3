import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = signal(false);
  private _currentUser = signal<User | null>(null);

  isAuthenticated = this._isAuthenticated.asReadonly();
  currentUser = this._currentUser.asReadonly();

  login(user: User) {
    this._currentUser.set(user);
    this._isAuthenticated.set(true);
  }

  logout() {
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
  }

  isAdmin(): boolean {
    return !!this._currentUser() && this._currentUser()!.role === 'ADMIN';
  }

  getCurrentRole(): string | null {
    return this._currentUser() ? this._currentUser()!.role : null;
  }
}

