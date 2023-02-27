import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlipCardComponent } from './components/flip-card/flip-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FlipCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected readonly title = 'marvel flip card';
}
