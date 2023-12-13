// clients.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clientService/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  clientToUpdate: any = {};
  isUpdateFormOpen: { [key: number]: boolean } = {}; // Dictionnaire pour stocker l'état d'ouverture du formulaire par client
  userIsAdmin: boolean = true;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe(
      (data: any) => {
        this.clients = data;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des clients : ', error);
      }
    );
  }

  deleteClient(id: number): void {
    this.clientsService.deleteClient(id).subscribe(
      (response) => {
        console.log(response);
        this.loadClients();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateClient(id: number): void {
    // Ouvrir ou fermer le formulaire en fonction de l'état actuel
    this.isUpdateFormOpen[id] = !this.isUpdateFormOpen[id];

    // Si le formulaire est ouvert, initialiser les données de mise à jour
    if (this.isUpdateFormOpen[id]) {
      this.clientToUpdate = { ...this.clients.find(client => client.id === id) };
    } else {
      // Si le formulaire est fermé, réinitialiser les données de mise à jour
      this.clientToUpdate = {};
    }
  }

  saveUpdatedClient(id: number): void {
    // Effectuer la mise à jour du client
    this.clientsService.updateClient(id, this.clientToUpdate).subscribe(
      (response) => {
        console.log(response);
        this.loadClients();
        // Fermer le formulaire après la mise à jour
        this.isUpdateFormOpen[id] = false;
        // Réinitialiser les données de mise à jour
        this.clientToUpdate = {};
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmDelete(client: any) {
    let result = confirm("Êtes-vous sûr de vouloir supprimer " + client.client_nom + " de votre liste de clients ?");
    if (result) {
      this.deleteClient(client.id);
    }
  }
}
