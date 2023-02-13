import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';

@Directive({
  selector: '[ellipsisTooltip]',
})
export class EllipsisTooltipDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cacheService: CacheService
  ) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const text = element.innerText;
    const maxWidth = element.offsetWidth;
    let fullTextWidth = this.getFullTextWidth(element, text);
    if (fullTextWidth > maxWidth) {
      this.renderer.setAttribute(element, 'title', text);
      this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
      this.renderer.setStyle(element, 'overflow', 'hidden');
    }
  }

  private getFullTextWidth(element: HTMLElement, text: string): number {
    const cachedWidth = this.cacheService.getCache(text);
    if (cachedWidth) {
      return cachedWidth;
    } else {
      const clonedElement = element.cloneNode() as HTMLElement;
      this.renderer.setStyle(clonedElement, 'position', 'absolute');
      this.renderer.setStyle(clonedElement, 'left', '-9999px');
      this.renderer.setProperty(clonedElement, 'innerText', text);
      this.renderer.setProperty(clonedElement, 'style', 'white-space: normal');
      this.renderer.appendChild(element.parentNode, clonedElement);
      const width = clonedElement.offsetWidth;
      this.renderer.removeChild(element.parentNode, clonedElement);
      this.cacheService.addToCache(text, width);
      this.cacheService.addToCache(text, width);
      return width;
    }
  }
}
