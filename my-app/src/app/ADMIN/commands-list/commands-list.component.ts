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
  public nbSelects : any[] = []
  public articles: any[] = [{name : "pas de données"}];
  selectedTourneeId: any;

  constructor(private http: HttpClient, private tokenService: TokenService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getTournees();
  }

  ajouter1SelectArticle(): void {
    this.nbSelects.push({type : "select"});
  }

  enlever1SelectArticle(): void {
    if(this.nbSelects.length>0){
      this.nbSelects.pop();
    }
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

  setToUpdate(command: any) {
    this.mapIsBeingModified.forEach((value, key) => {
      this.mapIsBeingModified.set(key, false);
    });
    this.modifiedCommand = [];
    this.nbSelects = []
    this.articles = []
    this.mapIsBeingModified.set(command.id_commande, true);

    const token = this.tokenService.getToken();
    const apiUrl = 'http://localhost:8000/articles/get_all_articles';

    this.http.get<any[]>(apiUrl, {
      headers: {
        'Authorization': 'Token ' + token 
      }
    })
      .subscribe(
        (data) => {
          this.articles = data.filter((article: any) => !command.articles.some((cmdArticle: any) => cmdArticle.id_article === article.article));
        },
        (error) => {
          console.error('Erreur lors de la récupération des articles : ', error);
        }
      );
  }

  cancelUpdate(id_commande: any) {
    this.mapIsBeingModified.set(id_commande, false);
    this.modifiedCommand = [];
    this.nbSelects = []
    this.articles = []
    
  }



  validateUpdate(command: any){
    
    command.articles.forEach((element: { 
      id_article: any; 
      quantite_unite: number; 
    }) => {
      let nbArticles = document.getElementById(`nbArticles${element.id_article}`);
      let article = document.getElementById(`article${element.id_article}`);
      let isDeleted = document.getElementById(`isDeleted${element.id_article}`);
      
      
      if (nbArticles instanceof HTMLInputElement && article instanceof HTMLInputElement && isDeleted instanceof HTMLInputElement) {
        
        let articleParse = JSON.parse(article.value)
        let isDeletedValue = isDeleted.checked ? 'true' : 'false';
        console.log(isDeletedValue);
        
        if(element.quantite_unite != 0){
          this.modifiedCommand.push({
            "is_deleted": isDeletedValue,
            "is_created": "false",  
            "id_article": element.id_article,
            "nbr_caisses": 0,
            "unite": nbArticles.value
          })
        }else{
          this.modifiedCommand.push({
            "is_deleted": isDeletedValue,
            "is_created": "false",  
            "id_article": element.id_article,
            "nbr_caisses": nbArticles.value,
            "unite": 0
          })
        }
      }
    });

    for (let i = 0; i < this.nbSelects.length; i++) {
      let nbArticlesAdd = document.getElementById(`nbArticlesAdd${i}`) as HTMLInputElement;
      let articleSelect = document.getElementById(`articleSelect${i}`) as HTMLSelectElement;
    
      if (nbArticlesAdd && articleSelect) {
        const articleSelectObj = JSON.parse(articleSelect.value);
    
        if (articleSelectObj.type == 'C') {
          this.modifiedCommand.push({
            "is_deleted": "false",
            "is_created": "true",
            "id_article": articleSelectObj.article,
            "nbr_caisses": nbArticlesAdd.value,
            "unite": 0
          });
        } else {
          this.modifiedCommand.push({
            "is_deleted": "false",
            "is_created": "true",
            "id_article": articleSelectObj.article,
            "nbr_caisses": 0,
            "unite": nbArticlesAdd.value
          });
        }
      }
    }

    console.log(this.modifiedCommand);
    
    
    const token = this.tokenService.getToken();
    const formData = {
      articles: this.modifiedCommand,
    };
    
    let isPermanent = document.getElementById(`isPermanent`) as HTMLInputElement;
    let isPermanentValue = isPermanent.checked ? true : false;
    let apiUrl
    console.log(isPermanentValue);

    if(isPermanentValue){
      apiUrl = 'http://localhost:8000/commande/update_commande_admin/' + command.id_commande;
    }else{
      console.log(command.id_commande_modifie);
      apiUrl = 'http://localhost:8000/commande/update_commande_admin/' + command.id_commande_modifie;
    }
     

    this.http.put(apiUrl, formData,{
      headers: {
        'Authorization': 'Token ' + token, 
        'Content-Type': 'application/json'
      }
      
    })
      .subscribe(
        (response) => {
          console.log('Réponse de l\'API:', response);
          this.getCommands(this.selectedTourneeId);
          this.modifiedCommand = [];
          this.nbSelects = []
          this.articles = []
        },
        (error) => {
          console.error('Erreur lors de la soumission du formulaire : ', error);
          this.getCommands(this.selectedTourneeId);
          this.modifiedCommand = [];
          this.nbSelects = []
          this.articles = []
        }
      );
    
    
    this.mapIsBeingModified.set(command.id_commande, false);
    
  }
}





