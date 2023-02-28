import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcement-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.scss'],
})
export class AnnouncementDialogComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
