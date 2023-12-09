import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-create-command-form',
  templateUrl: './create-command-form.component.html',
  styleUrls: ['./create-command-form.component.css'],
})
export class CreateCommandFormComponent {
  isConnected: any;
  commandForm = new FormGroup({
    client: new FormControl('', Validators.required),
    article: new FormControl('', Validators.required),
    tournee: new FormControl('', Validators.required),
  });
  public nbSelects : any[] = [{type : "select"}]
  public articles: any[] = [{name : "pas de données"}];
  public tournees: any[] = [{name : "pas de données"}];
  public clients: any[] = [{name : "pas de données"}];
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  

  ajouter1SelectArticle(): void {
    this.nbSelects.push({type : "select"})
  }

  enlever1SelectArticle(): void {
    if(this.nbSelects.length>1)this.nbSelects.pop();
  }

  ngOnInit(): void {
    this.getArticles();
    this.getClients();
    this.getTournees();
    this.tokenService.isConnected$.subscribe(newValue => {
      this.isConnected = newValue;
    });
  }

  getArticles(): void {
    const apiUrl = 'http://localhost:8000/commande/getAll';

    this.http.get<any[]>(apiUrl)
      .subscribe(
        (data) => {
          this.articles = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des articles : ', error);
        }
      );
  }

  getTournees(): void {
    const apiUrl = 'https://exemple.com/api/objets';

    this.http.get<any[]>(apiUrl)
      .subscribe(
        (data) => {
          this.tournees = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des tournées : ', error);
        }
      );
  }

  getClients(): void {
    const apiUrl = 'https://exemple.com/api/objets';

    this.http.get<any[]>(apiUrl)
      .subscribe(
        (data) => {
          this.clients = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des clients : ', error);
        }
      );
  }
  
  onSubmit() {
    if (this.commandForm.valid) {
      const formData = {
        client: this.commandForm.value.client,
        article: this.commandForm.value.article,
        tournee: this.commandForm.value.tournee,
      };

      const apiUrl = 'http://localhost:8000/login/loginUser';

      this.http.post(apiUrl, formData)
        .subscribe(
          (response) => {
            console.log('Réponse de l\'API:', response);
          },
          (error) => {
            console.error('Erreur lors de la soumission du formulaire : ', error);
          }
        );
    }else{
      
    }
    
  }
}
