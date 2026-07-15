import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../services/citas';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent implements OnInit {

  // 📌 LISTA DE CITAS
  citas: any[] = [];

  // 📌 CONTROL UI
  mostrar: boolean = false;

  // 📌 FORMULARIO NUEVA CITA
  nuevaCita = {
    nombre: '',
    apellido: '',
    documento: '',
    fecha: ''
  };

  // 📌 CONSTRUCTOR
  constructor(private citasService: CitasService) {
    console.log("CONSTRUCTOR EJECUTADO");
  }

  // 📌 INIT
  ngOnInit(): void {
    console.log("NGONINIT EJECUTADO");
    this.obtenerCitas();
  }

  // =========================
  // 📌 GET CITAS
  // =========================
  obtenerCitas(): void {
    this.citasService.getCitas().subscribe({
      next: (data: any[]) => {
        console.log("DATOS:", data);
        this.citas = data;
      },
      error: (err: any) => {
        console.error("ERROR:", err);
      }
    });
  }

  // =========================
  // 📌 POST CREAR CITA
  // =========================
  agendarCita(): void {
    this.citasService.crearCita(this.nuevaCita).subscribe({
      next: (res) => {
        console.log("CITA CREADA:", res);
        alert("Cita agendada correctamente ✅");

        // limpiar formulario
        this.nuevaCita = {
          nombre: '',
          apellido: '',
          documento: '',
          fecha: ''
        };

        this.obtenerCitas(); // refrescar lista
      },
      error: (err) => {
        console.error(err);
        alert(err.error); // mensaje del backend
      }
    });
  }

  // =========================
  // 📌 UI TOGGLE
  // =========================
  toggleCitas(): void {
    this.mostrar = !this.mostrar;
  }
}