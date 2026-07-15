import { Routes } from '@angular/router';
import { CitasComponent } from './components/citas/citas';

export const routes: Routes = [
  { path: '', component: CitasComponent }, // 👈 ESTA ES LA CLAVE
  { path: 'citas', component: CitasComponent }
];