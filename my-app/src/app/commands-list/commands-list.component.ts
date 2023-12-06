import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commands-list',
  templateUrl: './commands-list.component.html',
  styleUrls: ['./commands-list.component.css']
})
export class CommandsListComponent implements OnInit {
  public commands: any[] = [{ type: "select" }];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCommands();
  }

  getCommands(): void {
    const apiUrl = 'http://localhost:8000/commande/getAll';

    this.http.get<any[]>(apiUrl)
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

