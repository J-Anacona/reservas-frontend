import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface LoginRespuesta {
  token: string;
  rol: string;
  nombre: string;
}

export interface RegistroDatos {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5247/api/Auth';

  registro(datos: RegistroDatos) {
    return this.http.post(`${this.apiUrl}/registro`, datos, { responseType: 'text' });
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginRespuesta>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((r) => {
          localStorage.setItem('token', r.token);
          localStorage.setItem('rol', r.rol);
          localStorage.setItem('nombre', r.nombre);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
  }

  get token() {
    return localStorage.getItem('token');
  }

  get nombre() {
    return localStorage.getItem('nombre');
  }

  estaLogueado() {
    return !!this.token;
  }

  esBarbero() {
    return localStorage.getItem('rol') === 'Barbero';
  }
}