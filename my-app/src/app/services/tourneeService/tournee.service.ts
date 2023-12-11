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
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/get_commandes_from_tournee/${tourneeId}`, { headers });
  }

  assignerTournee(tourneeId: number, livreurId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const url = `${this.apiUrl}/assigner_tournee/${tourneeId}`;
    const body = { livreur_id: livreurId };
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    
    return this.http.post(url, body, { headers });
  }
}
