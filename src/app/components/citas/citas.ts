import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas';
import { Auth } from '../../services/auth';

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
    private router: Router
  ) {}

  agendarCita(): void {

    this.citasService.crearCita(this.fecha).subscribe({

      next: () => {
        alert("Cita agendada correctamente ✅");
        this.fecha = '';
      },

      error: (err) => {
        console.error(err);
        alert(typeof err.error === 'string' ? err.error : 'No se pudo agendar la cita');
      }

    });

  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}