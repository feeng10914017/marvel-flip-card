import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CardComponent } from './components/card/card.component';
import { CardBackImg, HeroImgs } from './constants/card-imgs.constant';
import { Setting } from './constants/setting.constant';
import { CardState } from './enums/card-state.enum';
import { CardInfo } from './interfaces/card.interface';
import { ToStringPipe } from './pipes/to-string.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CardComponent, ToStringPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild('main', { static: true }) mainElement!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this._handleGamingZoon();
  }

  private readonly _imgPath = Setting.imgPath;
  protected readonly title = 'marvel flip card';
  protected readonly cardBackImage = this._imgPath + CardBackImg;
  protected readonly cardBackImageAlt = 'Marvel Card';
  protected readonly cardAnimationTime = 0.5;
  protected readonly cardGap = 16;
  protected sideHeight = 0;
  protected sideWidth = 0;
  protected cardHeight = 0;
  protected cardWidth = 0;
  protected cardInfo: CardInfo[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._handleGamingZoon();
      this._setCard();
    }, 0);
  }

  private _handleGamingZoon(): void {
    const mainHeight: number = this.mainElement.nativeElement.clientHeight;
    const mainWidth: number = this.mainElement.nativeElement.clientWidth;
    const shortSide = mainWidth >= mainHeight ? mainHeight : mainWidth;
    const sideInteger = Math.floor(shortSide);

    this.cardHeight = Math.floor((sideInteger - this.cardGap * 3) / 4);
    this.cardWidth = Math.floor(this.cardHeight * 0.63);
    this.sideHeight = sideInteger;
    this.sideWidth = this.cardWidth * 4 + this.cardGap * 3;
  }

  private _setCard() {
    const heros = Object.keys(HeroImgs);
    heros.forEach((heroName, index) => {
      const bufferInfo: CardInfo = {
        id: index,
        frontImg: this._imgPath + HeroImgs[heroName],
        frontImgAlt: heroName,
        state: CardState.FACE_DOWN,
      };
      this.cardInfo.push(bufferInfo);
    });
  }
}
