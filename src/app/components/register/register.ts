import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class register {

  datos = {
    nombre: '',
    apellido: '',
    documento: '',
    email: '',
    password: ''
  };

  error = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  registrar(): void {
    this.error = '';

    this.auth.registro(this.datos).subscribe({
      next: () => {
        alert('Registro exitoso, ahora inicia sesión ✅');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const e = err.error;

        if (Array.isArray(e)) {
          this.error = e.join(' ');
        } else if (typeof e === 'string') {
          this.error = e;
        } else {
          this.error = 'No se pudo completar el registro';
        }

        this.cd.detectChanges();
      }
    });
  }
}