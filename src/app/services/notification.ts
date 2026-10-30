
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notificacion {
  tipo: 'exito' | 'error' | 'advertencia' | 'info';
  titulo: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificacionSubject = new Subject<Notificacion | null>();

  notificacion$ = this.notificacionSubject.asObservable();

  exito(mensaje: string, titulo = 'Operación exitosa'): void {
    this.mostrar('exito', titulo, mensaje);
  }

  error(mensaje: string, titulo = 'Ha ocurrido un error'): void {
    this.mostrar('error', titulo, mensaje);
  }

  advertencia(mensaje: string, titulo = 'Atención'): void {
    this.mostrar('advertencia', titulo, mensaje);
  }

  info(mensaje: string, titulo = 'Información'): void {
    this.mostrar('info', titulo, mensaje);
  }

  private mostrar(
    tipo: Notificacion['tipo'],
    titulo: string,
    mensaje: string
  ): void {
    this.notificacionSubject.next({ tipo, titulo, mensaje });
  }

}
