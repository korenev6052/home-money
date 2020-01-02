import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[u-dropdown]'
})

export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false;
  @HostListener('click') onclick() {
    this.isOpen = !this.isOpen;
  }
}