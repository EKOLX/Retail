import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  @Input() bgColor: string = "bg-info";
  @HostBinding("style.color") foregroundColor: string = "black";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter") onMouseEnter(event: Event) {
    this.renderer.addClass(this.elementRef.nativeElement, this.bgColor);
    this.foregroundColor = "white";
  }

  @HostListener("mouseleave") onMouseLeave(event: Event) {
    this.renderer.removeClass(this.elementRef.nativeElement, this.bgColor);
    this.foregroundColor = "black";
  }
}
