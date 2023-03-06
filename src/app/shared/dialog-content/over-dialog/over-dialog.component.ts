import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-over-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './over-dialog.component.html',
  styleUrls: ['./over-dialog.component.scss'],
})
export class OverDialogComponent {
  @Input() overResult = false;

  constructor(public activeModal: NgbActiveModal) {}
}
