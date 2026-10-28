import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { register } from './components/register/register';
import { CitasComponent } from './components/citas/citas';
import { ViewAppointments } from './components/view-appointments/view-appointments';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: register },
  { path: 'citas', component: CitasComponent, canActivate: [authGuard] },
  { path: 'view-appointments', component: ViewAppointments, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];