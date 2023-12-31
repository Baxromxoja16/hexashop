import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOut]'
})
export class ClickOutDirective {

  constructor(private elementRef: ElementRef) { }

  @Output() appClickOut = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {

      if (!targetElement) {
          return;
      }
      const clickedInside = this.elementRef.nativeElement.contains(targetElement);

      if (!clickedInside) {
          this.appClickOut.emit(event);
      }
  }
}
