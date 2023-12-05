import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent /*implements OnInit*/ {

  onSubmit() {
    // Logique de gestion de la soumission du formulaire
  }
  // helloWorldMessage: string = '';

  // constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   this.fetchHelloWorld();
  // }

  // fetchHelloWorld() {
  //   this.http.get<any>('http://localhost:8000/commande/helloWorld')
  //     .subscribe(
  //       data => {
  //         console.log('Response from Django API:', data);
  //         this.helloWorldMessage = data.message; // Mettez la propriété correcte selon la réponse de votre API
  //       },
  //       error => {
  //         console.error('Error fetching data from Django API:', error);
  //       }
  //     );
  // }

}
