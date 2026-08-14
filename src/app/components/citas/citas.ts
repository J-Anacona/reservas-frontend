import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent {

  nuevaCita = {
    nombre: '',
    apellido: '',
    documento: '',
    fecha: ''
  };

  constructor(private citasService: CitasService) {}

  agendarCita(): void {

    this.citasService.crearCita(this.nuevaCita).subscribe({

      next: () => {

        alert("Cita agendada correctamente ✅");

        this.nuevaCita = {
          nombre: '',
          apellido: '',
          documento: '',
          fecha: ''
        };

      },

      error: (err) => {

        console.error(err);
        alert(err.error);

      }

    });

  }

}