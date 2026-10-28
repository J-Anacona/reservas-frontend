import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = 'http://localhost:5247/api/Citas';

  constructor(private http: HttpClient) {}

  // Barbero: todas las citas. Usuario: solo las suyas (el backend filtra por rol)
  getCitas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMisCitas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Solo se manda la fecha, en UTC
  crearCita(fecha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      fecha: new Date(fecha).toISOString()
    });
  }
}