// livreur-page.component.ts
import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/app/services/livreurService/livreur.service';

@Component({
  selector: 'app-livreur-page',
  templateUrl: './livreur-page.component.html',
  styleUrls: ['./livreur-page.component.css']
})
export class LivreurPageComponent implements OnInit {

  tournees: any[] = [];
  est_livre : Boolean = false
  constructor(private livreurService: LivreurService) { }

  ngOnInit() {
    this.get_tournees();
  }

  get_tournees(): void {
    this.livreurService.getTourneesLivreur()
      .subscribe(
        (tournees) => {
          this.tournees = tournees.map(tournee => ({ ...tournee, commandes: [] }));
          this.tournees.forEach(tournee => console.log('ID de la tournée :', tournee.id_tournee));

        },
        (error) => {
          console.error('Erreur lors de la récupération des tournées du livreur : ', error);
        }
      );
  }
  
  marquerCommeLivre(idCommande: number): void {
    console.log(idCommande);
    this.livreurService.marquerCommeLivre(idCommande).subscribe(
      (response) => {
        this.est_livre=true;

        console.log(response.message); 

      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la commande : ', error);
      }
    );
  }


  loadCommandes(tourneeId: number): void {
    const index = this.tournees.findIndex(tournee => tournee.id_tournee === tourneeId);
    if (index !== -1) {
      if (this.tournees[index].commandes.length === 0) {
        this.livreurService.getCommandesFromTournee(tourneeId).subscribe(
          (commandesData: any) => {
            this.tournees[index].commandes = commandesData.map((commande: any) => ({
              ...commande,
              client: {
                name: commande.client,
                adresse: commande.client_adresse
              }
            }));
          },
          (error) => {
            console.error('Erreur lors du chargement des commandes de la tournée', error);
          }
        );
      }
    }
  }





}
