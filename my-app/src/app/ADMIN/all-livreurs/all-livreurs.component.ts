import { Component } from '@angular/core';
import { LivreurService } from 'src/app/services/livreurService/livreur.service';

@Component({
  selector: 'app-all-livreurs',
  templateUrl: './all-livreurs.component.html',
  styleUrls: ['./all-livreurs.component.css']
})
export class AllLivreursComponent {


  livreurs: any[] = [];

  constructor(private livreurService: LivreurService) {}

  ngOnInit(): void {
    this.loadLivreurs();
  }

  loadLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe(
      (data: any) => {
        this.livreurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des livreurs', error);
      }
    );
  }

}
