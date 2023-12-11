import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.setToConnected();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.setToDisconnected();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private isConnectedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isConnected$ = this.isConnectedSubject.asObservable();

  setToDisconnected() {
    this.isConnectedSubject.next(false);
  }

  setToConnected() {
    this.isConnectedSubject.next(true);
  }
}
