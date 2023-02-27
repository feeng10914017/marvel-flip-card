import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { interval, timer } from 'rxjs';
import { FlipCardComponent } from './components/flip-card/flip-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgbModule, FlipCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected readonly title = 'marvel flip card';

  ngOnInit() {}
}
