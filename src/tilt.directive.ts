import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Adds a 3D mouse-tilt + spotlight effect to an element.
 * The spotlight is driven by the --mx / --my CSS custom properties.
 */
@Directive({
  selector: '[appTilt]',
})
export class TiltDirective {
  private el = inject(ElementRef<HTMLElement>);
  private readonly max = 8; // max degrees

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * this.max * 2;
    const rotateX = (0.5 - py) * this.max * 2;

    node.style.setProperty('--mx', `${px * 100}%`);
    node.style.setProperty('--my', `${py * 100}%`);
    node.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    const node = this.el.nativeElement;
    node.style.transform = '';
  }
}
