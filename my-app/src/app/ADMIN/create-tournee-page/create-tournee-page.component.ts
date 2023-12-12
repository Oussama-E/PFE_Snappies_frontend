import { Component } from '@angular/core';
import { TourneeService } from 'src/app/services/tourneeService/tournee.service';

@Component({
  selector: 'app-create-tournee-page',
  templateUrl: './create-tournee-page.component.html',
  styleUrls: ['./create-tournee-page.component.css']
})

export class CreateTourneePageComponent {

  nomTournee: string = '';

  constructor(private tourneeService: TourneeService) { }


  creerTournee() {
    this.tourneeService.creerTournee(this.nomTournee).subscribe(
      (response) => {
        console.log('Tournée créée avec succès:', response);
      },
      (error) => {
        console.error('Erreur lors de la création de la tournée:', error);
      }
    );
  }
}

