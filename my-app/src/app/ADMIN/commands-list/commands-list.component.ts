import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-commands-list',
  templateUrl: './commands-list.component.html',
  styleUrls: ['./commands-list.component.css']
})
export class CommandsListComponent implements OnInit {

  public mapIsBeingModified: Map<number, boolean> = new Map();
  public commands: any[] = [];
  public tournees: any[] = [];
  modifiedCommand: any[] = [];
  selectedTourneeId: any;

  constructor(private http: HttpClient, private tokenService: TokenService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getTournees();
  }

  getTournees(): void {
    const token = this.tokenService.getToken();
    const apiUrl = 'http://localhost:8000/tournee/get_all_tournee';

    this.http.get<any[]>(apiUrl, {
      headers: {
        'Authorization': 'Token ' + token
      }
    })
      .subscribe(
        (data) => {
          this.tournees = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des tournées : ', error);
        }
      );
  }

  getCommands(idTournee: any): void {
    const token = this.tokenService.getToken();
    const apiUrl = 'http://localhost:8000/commande/get_commandes_tournee_admin/' + idTournee;

    this.http.get<any[]>(apiUrl, {
      headers: {
        'Authorization': 'Token ' + token
      }
    })
      .subscribe(
        (data) => {
          this.commands = data;
          this.mapIsBeingModified.clear();
          data.forEach(commande => {
            this.mapIsBeingModified.set(commande.id_commande, false);
          });
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Erreur lors de la récupération des commandes : ', error);
        }
      );
  }

  onTourneeChange(event: any) {
    this.selectedTourneeId = event.target.value;
    this.getCommands(this.selectedTourneeId);
  }

  setToUpdate(id_commande: any) {
    this.mapIsBeingModified.set(id_commande, true);
  }

  deleteArticle(article: any){
    this.modifiedCommand.push({
      "is_deleted": "true",
      "is_created": "false",  
      "id_article": article.id_article,
      "nbr_caisses": article.quantite_caisse,
      "unite": article.quantite_unite
    })
  }


  validateUpdate(command: any){
    
    command.articles.forEach((element: { 
      id_article: any; 
      quantite_unite: number; 
    }) => {
      let nbArticles = document.getElementById(`nbArticles${element.id_article}`);
      let article = document.getElementById(`article${element.id_article}`);

      if (nbArticles instanceof HTMLInputElement && article instanceof HTMLInputElement) {
        let articleParse = JSON.parse(article.value)
        if(element.quantite_unite != 0){
          this.modifiedCommand.push({
            "is_deleted": "false",
            "is_created": "false",  
            "id_article": element.id_article,
            "nbr_caisses": 0,
            "unite": nbArticles.value
          })
        }else{
          this.modifiedCommand.push({
            "is_deleted": "false",
            "is_created": "false",  
            "id_article": element.id_article,
            "nbr_caisses": nbArticles.value,
            "unite": 0
          })
        }
      }
    });
    
    const token = this.tokenService.getToken();
    const formData = {
      articles: this.modifiedCommand,
    };
    

    const apiUrl = 'http://localhost:8000/commande/update_commande_admin/' + command.id_commande;

    this.http.put(apiUrl, formData,{
      headers: {
        'Authorization': 'Token ' + token, 
        'Content-Type': 'application/json'
      }
      
    })
      .subscribe(
        (response) => {
          console.log('Réponse de l\'API:', response);
        },
        (error) => {
          console.error('Erreur lors de la soumission du formulaire : ', error);
        }
      );
    
    this.modifiedCommand = [];
    this.mapIsBeingModified.set(command.id_commande, false);
    this.getCommands(this.selectedTourneeId);
  }
}





