import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription, tap } from 'rxjs';
import { DialogService } from './core/dialog/dialog.service';
import { HeroImgs } from './shared/constants/card-imgs.constant';
import { FlipCardComponent } from './shared/widgets/flip-card/flip-card.component';
import { AnnouncementDialogComponent } from './shared/dialog-content/announcement-dialog/announcement-dialog.component';
import { OverDialogComponent } from './shared/dialog-content/over-dialog/over-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgbModule, FlipCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _timer: Subscription | null = null;
  private _isEndGame = false;
  protected readonly title = 'marvel flip';
  protected readonly heroImages = HeroImgs;
  protected hasReadAnnouncement = false;
  protected heroNames: string[] = [];
  protected seconds = 0;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this._showAnnouncement();
  }

  private _getRandomHeros(num: number): string[] {
    const heros = Object.keys(HeroImgs);
    const newHeros: string[] = [];
    while (newHeros.length < num) {
      const randomNum = Math.floor(Math.random() * heros.length);
      const tempHero = heros[randomNum];
      if (!newHeros.find(hero => hero === tempHero)) {
        newHeros.push(tempHero);
      }
    }
    return newHeros;
  }

  private _onStart(): void {
    if (this._timer) this._timer.unsubscribe();
    this.heroNames = this._getRandomHeros(8);
    this._startInterval();
  }

  private _showAnnouncement(): void {
    const dialogRef = this.dialogService.open(AnnouncementDialogComponent, 'large', true);
    dialogRef.componentInstance.title = 'announcement';
    dialogRef.componentInstance.positiveButtonText = 'start';
    dialogRef.result.then(
      result => {
        this.hasReadAnnouncement = true;
        this._onStart();
      },
      reason => {}
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
    if (this._isEndGame) return;
    this._isEndGame = true;

    const dialogRef = this.dialogService.open(OverDialogComponent, 'small', true);
    dialogRef.componentInstance.title = '';
    dialogRef.componentInstance.contentInputs = { overResult: isWin };
    dialogRef.result.finally(() => {
      this._onStart();
      this._isEndGame = false;
    });
  }

  protected onOver(): void {
    this._endInterval();
    this._showOverDialog(true);
  }
}
