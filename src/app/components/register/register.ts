
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { NotificationService } from '../../services/notification';

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
    telefono: '',
    email: '',
    password: ''
  };

  constructor(
    private auth: Auth,
    private router: Router,
    private notification: NotificationService
  ) {}
  
  mostrarPassword = false;

alternarPassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
}

  registrar(): void {

    // Validar campos vacíos
    if (!this.datos.nombre.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa tu nombre.',
        'Nombre requerido'
      );
      return;
    }

    if (!this.datos.apellido.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa tu apellido.',
        'Apellido requerido'
      );
      return;
    }

    if (!this.datos.telefono.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa tu número de teléfono.',
        'Teléfono requerido'
      );
      return;
    }

    if (!this.datos.email.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa tu correo electrónico.',
        'Correo requerido'
      );
      return;
    }

    if (!this.datos.password.trim()) {
      this.notification.advertencia(
        'Por favor, ingresa una contraseña.',
        'Contraseña requerida'
      );
      return;
    }

    // Validar nombre y apellido
    const expresionNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;

    if (!expresionNombre.test(this.datos.nombre.trim())) {
      this.notification.advertencia(
        'El nombre solo debe contener letras.',
        'Nombre no válido'
      );
      return;
    }

    if (!expresionNombre.test(this.datos.apellido.trim())) {
      this.notification.advertencia(
        'El apellido solo debe contener letras.',
        'Apellido no válido'
      );
      return;
    }

    // Validar teléfono: únicamente números, entre 7 y 15 dígitos
    if (!/^\d{7,15}$/.test(this.datos.telefono.trim())) {
      this.notification.advertencia(
        'El teléfono debe contener únicamente números y tener entre 7 y 15 dígitos.',
        'Teléfono no válido'
      );
      return;
    }

    // Validar correo
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(this.datos.email.trim())) {
      this.notification.advertencia(
        'Ingresa una dirección de correo electrónico válida.',
        'Correo no válido'
      );
      return;
    }

    // Enviar registro
    const datosRegistro = {
      nombre: this.datos.nombre.trim(),
      apellido: this.datos.apellido.trim(),
      telefono: this.datos.telefono.trim(),
      email: this.datos.email.trim(),
      password: this.datos.password
    };

    this.auth.registro(datosRegistro).subscribe({

      next: () => {
        this.notification.exito(
          'Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.',
          '¡Registro exitoso!'
        );

        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error('Error al registrar usuario:', err);

        const mensaje = typeof err.error === 'string'
          ? err.error
          : 'No se pudo completar el registro. Verifica tus datos.';

        // Correo o teléfono ya registrados
        if (
          err.status === 409 ||
          (err.status === 400 &&
            /correo|email|teléfono|telefono|registrad|existe|duplicad/i.test(mensaje))
        ) {
          this.notification.advertencia(
            mensaje,
            'Datos ya registrados'
          );
          return;
        }

        // Otros errores de validación
        if (err.status === 400) {
          this.notification.advertencia(
            mensaje,
            'Verifica tus datos'
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
          'Ocurrió un problema al crear tu cuenta. Inténtalo nuevamente más tarde.',
          'Error de registro'
        );
      }

    });
  }
}
