import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { HeadComponent } from './routes/head/head.component';
import { FootComponent } from './routes/foot/foot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    HeadComponent,
    FootComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'knnthdev';
}
