import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewContainer]',
  standalone: true,
})
export class ViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
