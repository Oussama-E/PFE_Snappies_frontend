// livreur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { environment } from 'src/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private apiUrl = environment.apiUrl; // Remplacez cela par l'URL réelle de votre API

  constructor(private http: HttpClient, private tokenService: TokenService) { }



//https://pfe-backend-souli-dev.azurewebsites.net/

  getAllLivreurs(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/commande/getAllLivreurs`, { headers });
  }

  
  getTourneesLivreur(): Observable<any[]> {
    const token = this.tokenService.getToken();
    const livreurUsername = this.tokenService.getLivreurUsername();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/commande/get_tournees_livreur/${livreurUsername}`, { headers });
  }

  getCommandesFromTournee(tourneeId: number): Observable<any> {
    console.log("get tournee from commande new");
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/commande/get_commandes_tournee_modifie_ou_non/${tourneeId}`, { headers });
  }

  createLivreur(username: string, password: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    const livreurData = {
      username: username,
      password: password,
    };

    return this.http.post<any>(`${this.apiUrl}/login/create_livreur`, livreurData, { headers });
  }
  marquerCommeLivre(idCommande: number): Observable<any> {
    const token = this.tokenService.getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    const url = `${this.apiUrl}/commande/update_livraison/${idCommande}`;

    return this.http.patch<any>(url, {} , {headers});
  }
 

}
