// clients.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:8000'; // Assurez-vous de mettre à jour l'URL selon votre configuration backend

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllClients(): Observable<any[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/client/get_all_clients`, { headers });
  }

  createClient(name: string, adresse: string, numero_telephone: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

   
    const clientData = {
      name: name,
      adresse: adresse,
      numero_telephone: numero_telephone,
    };

    return this.http.post<any>(`${this.apiUrl}/client/create_client`, clientData, { headers });
  }
 

  getClient(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`${this.apiUrl}/client/get_client/${id}`, { headers });
  }

  deleteClient(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/client/delete_client/${id}`, { headers });
  }

  updateClient(id: number, clientData: any): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<any>(`${this.apiUrl}/client/update_client/${id}`, clientData, { headers });
  }
}
