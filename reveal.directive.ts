import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

/**
 * Reveals an element when it scrolls into view.
 * Usage:
 *   appReveal            -> default fade-up
 *   appReveal="left"     -> slide in from the left
 *   appReveal="right"    -> slide in from the right
 *   appReveal="scale"    -> zoom/scale in
 *   [revealDelay]="120"  -> stagger delay in ms
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit {
  private el = inject(ElementRef<HTMLElement>);

  @Input('appReveal') variant = '';
  @Input() revealDelay = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.classList.add('reveal');
    if (this.variant) {
      node.classList.add(`reveal--${this.variant}`);
    }
    if (this.revealDelay) {
      node.style.transitionDelay = `${this.revealDelay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
  }
}
