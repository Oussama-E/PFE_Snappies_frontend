import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-commands-list',
  templateUrl: './commands-list.component.html',
  styleUrls: ['./commands-list.component.css']
})
export class CommandsListComponent implements OnInit {
  public commands: any[] = [{ type: "select" }];

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getCommands();
  }

  getCommands(): void {
    const token = this.tokenService.getToken();
    const apiUrl = 'http://localhost:8000/commande/getAll';

    this.http.get<any[]>(apiUrl, {
      headers: {
        'Authorization': 'Token ' + token 
      }
    }
      )
      .subscribe(
        (data) => {
          this.commands = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des commandes : ', error);
        }
      );
  }
}

