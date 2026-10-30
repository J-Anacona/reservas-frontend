
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { NotificationService } from '../../services/notification';

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

  constructor(
    private auth: Auth,
    private router: Router,
    private notification: NotificationService
  ) {}

  iniciarSesion(): void {

    // Validar campos vacíos
    if (!this.email.trim() && !this.password.trim()) {
      this.notification.advertencia(
        'Debes ingresar tu correo electrónico y contraseña.',
        'Campos vacíos'
      );
      return;
    }

    if (!this.email.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa tu correo electrónico.',
        'Correo requerido'
      );
      return;
    }

    if (!this.password.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa tu contraseña.',
        'Contraseña requerida'
      );
      return;
    }

    // Iniciar sesión
    this.auth.login(this.email, this.password).subscribe({

      next: (r) => {
        this.notification.exito(
          'Has iniciado sesión correctamente.',
          '¡Bienvenido!'
        );

        this.router.navigate([
          r.rol === 'Barbero' ? '/view-appointments' : '/citas'
        ]);
      },

      error: (err) => {

        // Correo no registrado
        if (err.status === 404) {
          this.notification.advertencia(
            'Este correo no está registrado. Verifica tus datos o crea una cuenta.',
            'Usuario no registrado'
          );
          return;
        }

        // Correo o contraseña incorrectos
        if (err.status === 401) {
          this.notification.advertencia(
            'El correo o la contraseña son incorrectos. Verifica e inténtalo nuevamente.',
            'Datos incorrectos'
          );
          return;
        }

        // Backend apagado o sin conexión
        if (err.status === 0) {
          this.notification.error(
            'No se pudo conectar con el servidor. Comprueba tu conexión o verifica que el backend esté funcionando.',
            'Servidor no disponible'
          );
          return;
        }

        // Otros errores
        this.notification.error(
          'Ocurrió un problema inesperado. Inténtalo nuevamente más tarde.',
          'Error del servidor'
        );
      }

    });
  }
}
