import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Setting } from 'src/app/constants/setting.constant';
import { CardBackImg, HeroImgs } from 'src/app/constants/card-imgs.constant';
import { CardInfo } from 'src/app/interfaces/card.interface';
import { CardState } from 'src/app/enums/card-state.enum';
import { CardComponent } from '../card/card.component';
import { ToStringPipe } from 'src/app/pipes/to-string.pipe';

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ToStringPipe],
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
})
export class FlipCardComponent implements OnInit, AfterViewInit {
  @ViewChild('main', { static: true }) mainElement!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this._handleGamingZoon();
  }

  @Output() overEvent = new EventEmitter();

  private readonly _imgPath = Setting.imgPath;
  private _tempCards: number[] = [];

  protected readonly cardBackImage = this._imgPath + CardBackImg;
  protected readonly cardBackImageAlt = 'Marvel Card';
  protected readonly cardAnimationTime = 0.45;
  protected readonly cardGap = 16;
  protected sideHeight = 0;
  protected sideWidth = 0;
  protected cardHeight = 0;
  protected cardWidth = 0;
  protected cardInfos: CardInfo[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._handleGamingZoon();
      this._initCardInfo();
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

  private _initCardInfo() {
    const heros = Object.keys(HeroImgs);
    const newHeros: string[] = [];
    while (newHeros.length < 8) {
      const randomNum = Math.floor(Math.random() * heros.length);
      const tempHero = heros[randomNum];
      if (!newHeros.find((hero) => hero === tempHero)) {
        newHeros.push(tempHero);
      }
    }

    const randomHeros: string[] = [];
    while (randomHeros.length < 16) {
      const randomNum = Math.floor(Math.random() * newHeros.length);
      if (
        randomHeros.filter((hero) => hero === newHeros[randomNum]).length !== 2
      ) {
        randomHeros.push(newHeros[randomNum]);
      }
    }

    randomHeros.forEach((hero, index) => {
      const bufferInfo: CardInfo = {
        id: index,
        frontImg: this._imgPath + HeroImgs[hero],
        frontImgAlt: hero,
        state: CardState.FACE_DOWN,
        canFlipper: true,
        isMatch: false,
      };
      this.cardInfos.push(bufferInfo);
    });
  }

  protected onFlop(id: number): void {
    this._tempCards.push(id);
    if (this._tempCards.length === 2) {
      for (let info of this.cardInfos) info.canFlipper = false;
    }
  }

  protected onFlopped(id: number): void {
    if (this._tempCards.length !== 2) return;
    if (this._tempCards[1] !== id) return;

    const firstCard = this.cardInfos[this._tempCards[0]];
    const secondCard = this.cardInfos[this._tempCards[1]];
    const isMatch = firstCard.frontImg === secondCard.frontImg;
    if (isMatch) {
      firstCard.isMatch = true;
      secondCard.isMatch = true;
    } else {
      firstCard.state = CardState.FACE_DOWN;
      secondCard.state = CardState.FACE_DOWN;
    }

    this._tempCards = [];
    for (let info of this.cardInfos) {
      if (!info.isMatch) info.canFlipper = true;
    }

    if (!this.cardInfos.find((info) => !info.isMatch)) this.overEvent.emit();
  }

  protected onFold(id: number): void {
    this._tempCards = this._tempCards.filter((tempId) => tempId !== id);
  }

  protected onFolded(id: number): void {}
}
