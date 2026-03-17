import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy, ComponentRef, ViewContainerRef } from '@angular/core';
import { $ } from '@tools/extensions.module'; 

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('tooltip') text: string = '';

  private element: HTMLElement | null = null;
  private timeout: any;

  constructor(private el: ElementRef, private renderer: Renderer2, private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {

  }
  ngOnDestroy() {

  }

  public show() {

  }

  public hide() {

  }

  private init() {
    const tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.text);
    this.renderer.appendChild(tooltip, text);
    this.renderer.appendChild(this.el.nativeElement, tooltip);

    this.classes();

  }

  classes() {
    if (!this.element) return;

    const baseClasses = [
      'absolute',
      'z-50',
      'px-2',
      'py-1',
      'text-sm',
      'text-primary',
      'bg-background',
      'rounded',
      'shadow-lg',
      'whitespace-nowrap',
      'transition-opacity',
      'duration-200',
      'opacity-0',
      'invisible'
    ];

    baseClasses.forEach((it)=>{
      this.renderer.addClass(this.element, it);
    });

  }

}
