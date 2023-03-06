import { CardState } from '../shared/enums/card-state.enum';

export interface Card extends CardInfo {
  backImg: string;
  backImgAlt: string;
  height: string;
  width: string;
  animationTime: number;
}

export interface CardInfo {
  id: number;
  frontImg: string;
  frontImgAlt: string;
  state: CardState;
  canFlipper: boolean;
  isMatch: boolean;
}
