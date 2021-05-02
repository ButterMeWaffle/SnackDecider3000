import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[HamburgerToggle]'
})
export class HamburgerToggleDirective {
  @HostBinding('class.is-active')
  private isActive = false;

  @HostListener('click')
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}