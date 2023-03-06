import { Component, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewContainerDirective } from 'src/app/core/dialog/directives/view-container/view-container.directive';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ViewContainerDirective],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @ViewChild(ViewContainerDirective, { static: true }) dialogBodyRef!: ViewContainerDirective;

  @Input() title = 'Dialog Title';

  @Input() component!: Type<unknown>;

  @Input() positiveButtonText = 'Ok';

  @Input() hidePositiveButton = false;

  @Input() negativeButtonText = 'Cancel';

  @Input() hideNegativeButton = true;

  @Input() contentInputs: Record<string, unknown> | undefined = undefined;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    const viewContainerRef: ViewContainerRef = this.dialogBodyRef.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(this.component);
    if (this.contentInputs) {
      const settingKeys = Object.keys(this.contentInputs);
      for (let key of settingKeys) componentRef.setInput(key, this.contentInputs[key]);
    }
  }
}
