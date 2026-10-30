
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-appointments.html',
  styleUrls: ['./view-appointments.css']
})
export class ViewAppointments implements OnInit {

  citas: any[] = [];
  esBarbero = false;

  constructor(
    private citasService: CitasService,
    private auth: Auth,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.esBarbero = this.auth.esBarbero();
    this.obtenerCitas();
  }

  // Obtener las citas desde la API
  obtenerCitas(): void {

    const peticion = this.esBarbero
      ? this.citasService.getCitas()
      : this.citasService.getMisCitas();

    peticion.subscribe({

      next: (data) => {
        this.citas = data;
        this.cd.detectChanges();
      },

      error: (err) => {
        console.error('Error al obtener las citas:', err);
      }

    });
  }

  // Mostrar únicamente las citas pendientes
  get citasPendientes(): any[] {
    return this.citas.filter(cita =>
      cita.estado?.trim().toLowerCase() === 'pendiente'
    );
  }

}
