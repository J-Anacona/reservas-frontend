import { Routes } from '@angular/router';
import { CitasComponent } from './components/citas/citas';
import { ViewAppointments } from './components/view-appointments/view-appointments';

export const routes: Routes = [
  { path: '', component: CitasComponent }, 
  { path: 'citas', component: CitasComponent },
  {path: 'view-appointments', component: ViewAppointments
  }
];