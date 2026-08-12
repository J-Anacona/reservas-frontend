import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-appointments.html',
  styleUrls: ['./view-appointments.css']
})
export class ViewAppointments implements OnInit {

  citas: any[] = [];

  constructor(
    private citasService: CitasService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    this.citasService.getCitas().subscribe({

      next: (data) => {

        this.citas = data;   
        this.cd.detectChanges();

      },

      error: (err) => {

        console.error('Error al obtener las citas:', err);

      }

    });
  }
}