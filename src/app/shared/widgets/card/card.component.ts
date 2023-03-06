import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardState } from 'src/app/shared/enums/card-state.enum';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements Card, OnChanges {
  @Input() id = 0;
  @Input() canFlipper = true;
  @Input() isMatch = false;

  @Input() frontImg = '';
  @Input() frontImgAlt = '';

  @Input() backImg = '';
  @Input() backImgAlt = '';

  @Input() height = '100';
  @Input() width = '63';
  @Input() animationTime = 0.5;

  @Input() state: CardState = CardState.FACE_DOWN;
  @Output() stateChange = new EventEmitter<CardState>();

  //翻牌事件
  @Output() flopEvent = new EventEmitter<number>();
  @Output() floppedEvent = new EventEmitter<number>();

  // 蓋牌事件
  @Output() foldEvent = new EventEmitter<number>();
  @Output() foldedEvent = new EventEmitter<number>();

  private _flipping = false;
  protected _isFaceDown = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['state']) return;

    this._isFaceDown = changes['state'].currentValue === CardState.FACE_DOWN;
  }

  private _toggleCard(
    nextState: CardState,
    startNotice: EventEmitter<number>,
    finishNotice: EventEmitter<number>
  ): void {
    this._flipping = true;
    this.state = nextState;
    this.stateChange.emit(nextState);
    this._isFaceDown = !this._isFaceDown;
    startNotice.emit(this.id);

    setTimeout(() => {
      this._flipping = false;
      finishNotice.emit(this.id);
    }, this.animationTime * 1000);
  }

  onClick(isFace: boolean): void {
    if (this._flipping) return;
    if (!this.canFlipper) return;

    isFace
      ? this._toggleCard(CardState.FACE_DOWN, this.foldEvent, this.foldedEvent)
      : this._toggleCard(CardState.FACE, this.flopEvent, this.floppedEvent);
  }
}
