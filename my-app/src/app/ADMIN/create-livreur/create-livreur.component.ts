import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LivreurService } from 'src/app/services/livreurService/livreur.service';

@Component({
  selector: 'app-create-livreur',
  templateUrl: './create-livreur.component.html',
  styleUrls: ['./create-livreur.component.css']
})
export class CreateLivreurComponent {

  livreurUsername: string = '';
  livreurPassword: string = '';

  constructor(private livreurService: LivreurService, private router : Router) {}

  createLivreur(): void {
    this.livreurService.createLivreur(this.livreurUsername, this.livreurPassword).subscribe(
      (response: any) => {
        console.log('Livreur created successfully:', response);
        this.router.navigate(['/livreurs']);
      },
      (error) => {
        console.error('Error creating livreur:', error);
      }
    );
  }

}
