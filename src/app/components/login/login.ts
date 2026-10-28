import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  error = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  iniciarSesion(): void {
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (r) => {
        this.router.navigate([r.rol === 'Barbero' ? '/view-appointments' : '/citas']);
      },
      error: (err) => {
        this.error = typeof err.error === 'string'
          ? err.error
          : 'No se pudo iniciar sesión';
        this.cd.detectChanges();
      }
    });
  }
}