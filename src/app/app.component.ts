import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { HeadComponent } from './routes/head/head.component';
import { FootComponent } from './routes/foot/foot.component';
import { ResponsiveService } from './tools/responsive.service';

@Component({
    selector: 'app-root',
    imports: [
        HomeComponent,
        HeadComponent,
        FootComponent,
        RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'knnthdev';
  tooltip: HTMLElement;
  tipitems: NodeListOf<HTMLElement>;
  limitTime = 1000;
  timeoffset: number = this.limitTime;

  constructor(responsive: ResponsiveService) {
    this.tooltip = {} as HTMLElement;
    this.tipitems = {} as NodeListOf<HTMLElement>;
    if (typeof(window) !== 'undefined') {
      this.tooltip = document.getElementById("tooltip") as HTMLElement;
      this.tipitems = document.querySelectorAll("[data-tooltip]");
    }
  }

  ngOnInit(): void {
    if (typeof(window) !== 'undefined') {
      this.tipitems.forEach(item => {
        item.addEventListener("mouseover", (event) => {
          const msg = item.getAttribute("data-tooltip")!;
          this.showTooltip(msg, event);
        });
        item.addEventListener("mouseout", () => {
          this.hideTooltip();
        });
        item.addEventListener("mousemove", (event) => {
          this.showTooltipWhileMoving(event);
        });
      });
    }
  }

  showTooltip(msg:string, eventmouse:MouseEvent) {
    this.tooltip.style.visibility = "visible";
    this.tooltip.innerHTML = msg === "" ? (eventmouse.target as HTMLElement).innerText : msg;
    this.limitTime = msg.length * 16 + 500;
    let timing = () => {
      --this.timeoffset;
      if (this.timeoffset <= 0) {
        this.hideTooltip();
        clearInterval(handle);
      }
    }
    let handle = setInterval(timing, 1);
  }
  
  showTooltipWhileMoving(eventmouse:any) {
    this.timeoffset = this.limitTime;
    const it = eventmouse.target as HTMLElement;
    const x = (eventmouse as MouseEvent).pageX;
    const y = (eventmouse as MouseEvent).pageY;
    // const windowMouseX = (eventmouse as MouseEvent).clientX;
    const windowMouseY = (eventmouse as MouseEvent).clientY;
    const tooltipWidth = this.tooltip.offsetWidth;
    const tooltipHeight = this.tooltip.offsetHeight;
    // const itWidth = it.offsetWidth;
    // const itHeight = it.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const positionx = x - (tooltipWidth / 2);
    const Cdivx = x - this.tooltip.getBoundingClientRect().left;

    this.tooltip.style.setProperty('--left', `${Cdivx - 5}px`);
    
    this.tooltip.style.left = `${positionx < 0 ? 0 : positionx > viewportWidth - tooltipWidth ? viewportWidth - tooltipWidth : positionx}px`;
    //this.tooltip.innerText = `X: ${x} PdivX:${this.tooltip.clientLeft} CdivX:${Cdivx}`
    
    if (windowMouseY > (viewportHeight - 80)) {
      this.tooltip.classList.add('overflow');
      this.tooltip.style.top = `${y - 20 - tooltipHeight}px`;
    } else {
      if (this.tooltip.classList.contains('overflow')) {
        this.tooltip.classList.remove('overflow');
      }
      this.tooltip.style.top = `${y + 37}px`;
    }
  }

  hideTooltip() {
    this.tooltip.style.visibility = "hidden";
  }
}
