import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription, tap } from 'rxjs';
import { AnnouncementDialogComponent } from './components/announcement-dialog/announcement-dialog.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { OverDialogComponent } from './components/over-dialog/over-dialog.component';
import { DialogService } from './services/dialog/dialog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgbModule, FlipCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _timer: Subscription | null = null;
  protected readonly title = 'marvel flip';
  protected hasReadAnnouncement = false;
  protected seconds = 0;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this._showAnnouncement();
  }

  private _showAnnouncement(): void {
    this.dialogService
      .open(AnnouncementDialogComponent, 'large', true, true)
      .result.then(
        (result) => {
          this.hasReadAnnouncement = true;
          this._startInterval();
        },
        (reason) => {}
      );
  }

  private _startInterval(): void {
    this.seconds = 30;

    this._timer = interval(1000)
      .pipe(tap(() => this.seconds--))
      .subscribe(() => {
        if (this.seconds !== 0) return;
        this._endInterval();
        this._showOverDialog(false);
      });
  }

  private _endInterval(): void {
    if (!this._timer) return;
    this._timer.unsubscribe();
    this._timer = null;
  }

  private _showOverDialog(isWin: boolean): void {
    const dialogRef = this.dialogService.open(
      OverDialogComponent,
      'small',
      true,
      true
    );
    dialogRef.componentInstance.overResult = isWin;

    dialogRef.result.then(
      (result) => this._startInterval(),
      (reason) => this._startInterval()
    );
  }

  protected onOver(): void {
    this._endInterval();
    this._showOverDialog(true);
  }
}
