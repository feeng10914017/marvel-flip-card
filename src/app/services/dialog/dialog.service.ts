import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

type TDialogSize = 'small' | 'medium' | 'large' | 'extra';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: NgbModal) {}

  open(
    component: unknown,
    dialogSize: TDialogSize,
    hasStatic: boolean,
    hasScrollBar: boolean,
    hasAnimation = true,
    options?: NgbModalOptions | undefined
  ): NgbModalRef {
    let newOptions = options || {};

    if (dialogSize !== 'medium') {
      newOptions = {
        ...newOptions,
        size:
          dialogSize === 'small' ? 'sm' : dialogSize === 'large' ? 'lg' : 'xl',
      };
    }

    if (hasStatic) {
      newOptions = { ...newOptions, backdrop: 'static', keyboard: false };
    }

    if (hasScrollBar) newOptions = { ...newOptions, scrollable: true };

    if (!hasAnimation) newOptions = { ...newOptions, animation: false };

    newOptions = { ...newOptions, centered: true };

    return this.modalService.open(component, newOptions);
  }
}
