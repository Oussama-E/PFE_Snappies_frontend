import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private readonly USERNAME_KEY = 'username'; 
  private readonly IS_ADMIN = 'isAdmin'; 
  private uservalueSubject = new BehaviorSubject<any>(null);
  uservalue$ : any;

  setToken(token: string, username: string, role: string ): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USERNAME_KEY, username);
    localStorage.setItem(this.IS_ADMIN, role);
    
    this.setToConnected();
    this.uservalue$ = {token, username}
    this.uservalueSubject.next({token, username}); // Ajoutez cette ligne
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY); 
    this.setToDisconnected();
  }

  getLivreurUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY); 
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private isConnectedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isConnected$ = this.isConnectedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(localStorage.getItem(this.IS_ADMIN) == "admin");
  isAdmin$ = this.isAdminSubject.asObservable();
  

  setToDisconnected() {
    this.isConnectedSubject.next(false);
    this.isAdminSubject.next(false);

  }

  setToConnected() {
    this.isConnectedSubject.next(true);
  }

  isAdmin(role: string): boolean {
    if(role == "admin"){
      this.isAdminSubject.next(true);
      return true;
    }else{
      this.isAdminSubject.next(false);
      return false;
    }
  }
  
  


}
