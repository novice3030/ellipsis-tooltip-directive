import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CacheService } from 'src/services/cache.service';

@Directive({
  selector: '[ellipsisTooltip]',
})
export class EllipsisTooltipDirective implements AfterViewInit {
  private cache = new Map<string, string>();

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
    console.log(fullTextWidth);
    if (fullTextWidth > maxWidth) {
      this.renderer.setAttribute(element, 'title', text);
      this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
      this.renderer.setStyle(element, 'overflow', 'hidden');
    } else if (this.cache.has(text)) {
      this.renderer.setProperty(element, 'innerText', this.cache.get(text));
    }
  }

  private getFullTextWidth(element: HTMLElement, text: string): number {
    const cachedWidth = this.cacheService.getCache(text);
    if (cachedWidth) {
      return cachedWidth;
    }
    const clonedElement = element.cloneNode() as HTMLElement;
    this.renderer.setStyle(clonedElement, 'position', 'absolute');
    this.renderer.setStyle(clonedElement, 'left', '-9999px');
    this.renderer.setProperty(clonedElement, 'innerText', text);
    this.renderer.setProperty(clonedElement, 'style', 'white-space: normal');
    this.renderer.appendChild(element.parentNode, clonedElement);
    const width = clonedElement.offsetWidth;
    this.renderer.removeChild(element.parentNode, clonedElement);
    this.cacheService.addToCache(text, width);
    return width;
  }
}
