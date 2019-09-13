import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  @HostBinding("style.color") foregroundColor: string = "black";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter") onMouseEnter(event: Event) {
    this.renderer.addClass(this.elementRef.nativeElement, "bg-info");
    this.foregroundColor = "white";
  }

  @HostListener("mouseleave") onMouseLeave(event: Event) {
    this.renderer.removeClass(this.elementRef.nativeElement, "bg-info");
    this.foregroundColor = "black";
  }
}
