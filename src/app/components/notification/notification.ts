import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService, Notificacion } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification implements OnInit, OnDestroy {

  notificacion: Notificacion | null = null;

  private suscripcion?: Subscription;
  private temporizador?: ReturnType<typeof setTimeout>;

  constructor(
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.suscripcion = this.notificationService.notificacion$.subscribe(data => {

      if (!data) return;

      clearTimeout(this.temporizador);

      this.notificacion = data;
      this.cd.detectChanges();

      this.temporizador = setTimeout(() => {
        this.cerrar();
      }, 3500);

    });
  }

  cerrar(): void {
    clearTimeout(this.temporizador);
    this.notificacion = null;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
    clearTimeout(this.temporizador);
  }
}