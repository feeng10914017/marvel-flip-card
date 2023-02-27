import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardState } from 'src/app/enums/card-state.enum';
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

  @Input() frontImg = '';
  @Input() frontImgAlt = '';

  @Input() backImg = '';
  @Input() backImgAlt = '';

  @Input() height = '100';
  @Input() width = '63';
  @Input() animationTime = 0.5;

  @Input() state: CardState = CardState.FACE_DOWN;
  @Output() stateChange = new EventEmitter<CardState>();

  @Output() flopEvent = new EventEmitter<number>();
  @Output() floppedEvent = new EventEmitter<number>();

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
    this._isFaceDown = !this._isFaceDown;
    this._flipping = true;
    this.state = nextState;
    startNotice.emit(this.id);

    setTimeout(() => {
      this._flipping = false;
      finishNotice.emit(this.id);
    }, this.animationTime);
  }

  onClick(isFace: boolean): void {
    if (this._flipping) return;

    isFace
      ? this._toggleCard(CardState.FACE_DOWN, this.foldEvent, this.foldedEvent)
      : this._toggleCard(CardState.FACE, this.foldEvent, this.foldedEvent);
  }
}
