import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notification } from './components/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Notification],
  templateUrl: './app.html'
})
export class AppComponent {}