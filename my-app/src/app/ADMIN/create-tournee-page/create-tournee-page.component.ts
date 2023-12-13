import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TourneeService } from 'src/app/services/tourneeService/tournee.service';

@Component({
  selector: 'app-create-tournee-page',
  templateUrl: './create-tournee-page.component.html',
  styleUrls: ['./create-tournee-page.component.css']
})

export class CreateTourneePageComponent {

  nomTournee: string = '';

  constructor(private tourneeService: TourneeService , private router: Router) { }


  creerTournee() {
    this.tourneeService.creerTournee(this.nomTournee).subscribe(
      (response) => {
        console.log('Tournée créée avec succès:', response);

        this.router.navigate(['/tournees']);

      },
      (error) => {
        console.error('Erreur lors de la création de la tournée:', error);
      }
    );
  }
}

