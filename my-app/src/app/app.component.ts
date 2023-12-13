import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  isConnected: any
  isAdmin: any = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.isConnected$.subscribe(newValue => {
      this.isConnected = newValue;
    });

    this.tokenService.uservalue$.subscribe((newValue: any) => { // Ajoutez cette ligne
      this.isAdmin = this.tokenService.isAdmin() || false;
      console.log("isAdmin=", this.isAdmin);
  });
}
 
  disconnect(): void {
    this.tokenService.removeToken();
    this.tokenService.setToDisconnected();
    console.log("logout");
  }
}
