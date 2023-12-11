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

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.isConnected$.subscribe(newValue => {
      this.isConnected = newValue;
    });
  }
 
  disconnect(): void {
    this.tokenService.removeToken();
    this.tokenService.setToDisconnected();
  }
}
