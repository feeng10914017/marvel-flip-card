import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './dialog.component';

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
    options?: NgbModalOptions | undefined
  ): NgbModalRef {
    let newOptions = options || {};

    if (dialogSize !== 'medium') {
      newOptions = {
        ...newOptions,
        size: dialogSize === 'small' ? 'sm' : dialogSize === 'large' ? 'lg' : 'xl',
      };
    }

    if (hasStatic) {
      newOptions = { ...newOptions, backdrop: 'static', keyboard: false };
    }

    newOptions?.animation !== undefined ? null : (newOptions.animation = true);
    newOptions?.scrollable !== undefined ? null : (newOptions.scrollable = true);
    newOptions?.centered !== undefined ? null : (newOptions.centered = true);

    const dialogRef = this.modalService.open(DialogComponent, newOptions);
    dialogRef.componentInstance.component = component;
    return dialogRef;
  }
}
