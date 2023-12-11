// tournee.component.ts
import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/app/services/livreurService/livreur.service';
import { TourneeService } from 'src/app/services/tourneeService/tournee.service';

@Component({
  selector: 'app-tournee',
  templateUrl: './tournee.component.html',
  styleUrls: ['./tournee.component.css']
})
export class TourneeComponent implements OnInit {
  livreurs: any[] = [];
  tourneesData: any[] = [];
  selectedTourneeId: number | null = null;
  commandesData: { [tourneeId: number]: any[] } = {};  
  selectedLivreurId: { [tourneeId: number]: number } = {};  
  userIsAdmin: boolean = true; 


  constructor( private tourneeService: TourneeService ,private livreurService: LivreurService) { }

  ngOnInit(): void {
    this.loadLivreurs();
    this.loadTournees();
  }

  loadTournees(): void {
    this.tourneeService.getAllTournees().subscribe(
      (data:any) => {
        this.tourneesData = data;
      },
      (error) => {
        console.error('Error loading tournees', error);
      }
    );
  }

  toggleDetails(tournee: any): void {
    tournee.showDetails = !tournee.showDetails;

    if (tournee.showDetails) {
      this.loadCommandes(tournee.id);
    }
  }

  loadCommandes(tourneeId: number): void {
    this.tourneeService.getCommandesFromTournee(tourneeId).subscribe(
      (commandesData: any) => {
        this.commandesData[tourneeId] = commandesData;  
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes de la tournée', error);
      }
    );
  }
  loadLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe(
      (data: any) => {
        this.livreurs = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des livreurs', error);
      }
    );
  }

  assignerTournee(tourneeId: number): void {
    const livreurId = this.selectedLivreurId[tourneeId];
    console.log(livreurId);
    if (livreurId) {
      console.log('Assigner la tournée:', tourneeId, 'à livreur:', livreurId);

      this.tourneeService.assignerTournee(tourneeId, livreurId).subscribe(
        (response: any) => {
          console.log(response);
          this.loadTournees();
          console.log(response);
        },
        (error) => {

          console.error('Erreur lors de l\'assignation de la tournée', error);
        }
      );
    }
  }
  
}
