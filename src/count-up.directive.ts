import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

/**
 * Animates a numeric value from 0 to its target when the element scrolls into view.
 * Preserves any non-numeric prefix/suffix (e.g. "+", ".", "/10").
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit {
  private el = inject(ElementRef<HTMLElement>);

  @Input('appCountUp') target = '';
  @Input() duration = 1400;

  private done = false;

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const match = this.target.match(/([^\d.]*)([\d.]+)(.*)/);

    if (!match) {
      node.textContent = this.target;
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const end = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

    node.textContent = `${prefix}0${decimals ? '.' + '0'.repeat(decimals) : ''}${suffix}`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.done) {
            this.done = true;
            this.animate(node, prefix, end, decimals, suffix);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
  }

  private animate(
    node: HTMLElement,
    prefix: string,
    end: number,
    decimals: number,
    suffix: string,
  ): void {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (end * eased).toFixed(decimals);
      node.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
}
