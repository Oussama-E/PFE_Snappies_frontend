import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clientService/clients.service';

@Component({
  selector: 'app-create-client-page',
  templateUrl: './create-client-page.component.html',
  styleUrls: ['./create-client-page.component.css']
})
export class CreateClientPageComponent {


  clientName: string = '';
  clientAdresse: string = '';
  clientTelephone: string = '';

  constructor(private clientsService: ClientsService, private router : Router) {}

  createClient(): void {
    this.clientsService.createClient(this.clientName, this.clientAdresse, this.clientTelephone).subscribe(
      (response: any) => {
        console.log('Client created successfully:', response);
        this.router.navigate(['/clients'])
      },
      (error) => {
        console.error('Error creating client:', error);
      }
    );
  }
}


