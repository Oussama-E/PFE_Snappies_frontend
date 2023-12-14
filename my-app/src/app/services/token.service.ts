import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private readonly USERNAME_KEY = 'username'; 
  private uservalueSubject = new BehaviorSubject<any>(null);
  uservalue$ : any;

  setToken(token: string, username: string ): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USERNAME_KEY, username); 
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

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  

  setToDisconnected() {
    this.isConnectedSubject.next(false);
    this.isAdminSubject.next(false);

  }

  setToConnected() {
    this.isConnectedSubject.next(true);
  }

  isAdmin(): boolean{
    let isAdmin = false;
    this.uservalue$.subscribe((value: any) => {
      console.log("uservalue", value);
      isAdmin = (value?.username ?? "") === "billy_admin";
    });
    return isAdmin;
  }
  
  


}
