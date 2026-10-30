
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas';
import { Auth } from '../../services/auth';
import { NotificationService } from '../../services/notification';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent {

  fecha = '';

  constructor(
    private citasService: CitasService,
    private auth: Auth,
    private router: Router,
    private notification: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  agendarCita(): void {

    // Validar que se haya seleccionado una fecha
    if (!this.fecha) {
      this.notification.advertencia(
        'Debes seleccionar la fecha y hora de tu cita.',
        'Fecha requerida'
      );
      return;
    }

    // Validar que la fecha no sea anterior a la actual
    const fechaSeleccionada = new Date(this.fecha);
    const ahora = new Date();

    if (fechaSeleccionada <= ahora) {
      this.notification.advertencia(
        'No puedes agendar una cita en una fecha u hora anterior a la actual.',
        'Fecha no válida'
      );
      return;
    }

    // Enviar solicitud al backend
    this.citasService.crearCita(this.fecha).subscribe({

            next: () => {
        this.fecha = '';
        this.cd.detectChanges();

        this.notification.exito(
          'Tu cita ha sido agendada correctamente.',
          '¡Cita confirmada!'
        );
        this.fecha = '';
      },

      error: (err) => {
        console.error('Error al agendar la cita:', err);

        if (err.status === 400) {
          this.notification.advertencia(
            typeof err.error === 'string'
              ? err.error
              : 'El horario seleccionado no está disponible. Elige otro.',
            'Horario no disponible'
          );
          return;
        }

        if (err.status === 0) {
          this.notification.error(
            'No se pudo conectar con el servidor. Verifica que el backend esté funcionando.',
            'Servidor no disponible'
          );
          return;
        }

        this.notification.error(
          'Ocurrió un problema al registrar tu cita. Inténtalo nuevamente.',
          'Error al agendar'
        );
      }

    });
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
