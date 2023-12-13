// tournee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TourneeService {
  private apiUrl = 'http://localhost:8000/tournee';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllTournees(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/get_all_tournee`, { headers });
  }

  getCommandesFromTournee(tourneeId: number): Observable<any> {
    console.log("get tournee from commande new");
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/get_commandes_tournee_modifie_ou_non/${tourneeId}`, { headers });
  }
  
  assignerTournee(tourneeId: number, livreurId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const url = `${this.apiUrl}/assigner_tournee/${tourneeId}`;
    const body = { livreur_id: livreurId };
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    
    return this.http.post(url, body, { headers });
  }

  deleteTournee(tourneeId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/delete_tournee/${tourneeId}`, { headers });
  }

  creerTournee(nom: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`  
    });

    const body = { nom };

    return this.http.post<any>(`${this.apiUrl}/creer_tournee`, body, { headers });
  }

  update_all_EstLivre(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    const url = `http://localhost:8000/commande/update_est_livre`;

    return this.http.patch<any>(url, {}, { headers });
  }






  
}
