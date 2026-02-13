import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from './routes/head/head.component';
import { FootComponent } from './routes/foot/foot.component';
import { ResponsiveService, TimeCounter } from './tools/responsive.service';

@Component({
  selector: 'app-root',
  imports: [
    HeadComponent,
    FootComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'knnthdev';
  tooltip: HTMLElement = {} as HTMLElement;
  tipitems: NodeListOf<HTMLElement> = {} as NodeListOf<HTMLElement>;
  limitTime = 4000;
  timer: TimeCounter | undefined;

  constructor(private rs: ResponsiveService) {
  }

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      this.timer = new TimeCounter();

      this.tooltipHandle();
      this.pluginsComponentsHandle();
      this.viewElementHandle();
    }
  }

  log(msg: string) {
    let it = document.getElementById("log") as HTMLElement;
    it.innerHTML = msg;
  }

  viewElementHandle() {
    window.addEventListener("load", () => {
      let elementsSelected = document.querySelectorAll("[show-if-view]") as NodeListOf<HTMLElement>;
      elementsSelected.forEach((it) => {
        const view = it.getAttribute("show-if-view")!;
        // if path is the same in view, show the element
        if (window.location.pathname !== view) {
          it.style.display = "none";
        }
      });
    });
  }

  pluginsComponentsHandle() {
    window.addEventListener("load", () => {
      let pluginsElements = document.querySelectorAll("[addto]") as NodeListOf<HTMLElement>;
      pluginsElements.forEach((it) => {
        const toID = it.getAttribute("addto")!;
        const toElement = document.getElementById(toID);
        if (toElement) {
          toElement.appendChild(it);
          it.removeAttribute("addto");
        }
      });

    });
  }

  tooltipHandle() {
    window.addEventListener("load", () => {
      this.tipitems = document.querySelectorAll("[data-tooltip]") as NodeListOf<HTMLElement>;
      this.tooltip = document.getElementById("tooltip") as HTMLElement;
      this.tipitems.forEach(item => {
        item.addEventListener("mouseover", (event) => {
          const msg = item.getAttribute("data-tooltip")!;
          this._showTooltip(msg, event);
        });
        item.addEventListener("mouseout", () => {
          this._hideTooltip();
        });
        item.addEventListener("mousemove", (event) => {
          this._showTooltipWhileMoving(event);
        });
      });
    });
  }

  _showTooltip(msg: string, eventmouse: MouseEvent) {
    this.tooltip.style.visibility = "visible";
    this.tooltip.innerHTML = msg === "" ? (eventmouse.target as HTMLElement).innerText : msg;
    this.limitTime = (msg.length * 16);

    this.timer?.setCallback((this._hideTooltip as Function).bind(this));
    this.timer?.start(this.limitTime);
    //this._showTooltipWhileMoving(eventmouse);
  }

  _showTooltipWhileMoving(eventmouse: MouseEvent) {
    
    const windowMouseY = eventmouse.clientY;
    const windowMouseX = eventmouse.clientX;
    const tooltipWidth = this.tooltip.offsetWidth;
    const tooltipHeight = this.tooltip.offsetHeight;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const positionl = windowMouseX - (tooltipWidth / 2);
        
    const positionLeft = this.tooltip.getBoundingClientRect().left;
    const positionRight = this.tooltip.getBoundingClientRect().right;
    const Cdivx = windowMouseX - positionLeft;
    let handleX = positionl;
    let handleY = 0;

    if (positionl < 0) {
      handleX = 0;
    }
    if (positionl + tooltipWidth + 32 > viewportWidth) {
      this.tooltip.style.right = `0px`;
    }
    else
      this.tooltip.style.left = `${handleX}px`;
    
    this.tooltip.style.setProperty('--left', `${Cdivx - 5}px`);

    if (windowMouseY > (viewportHeight - (tooltipHeight + 50))) {
      this.tooltip.classList.add('overflow');
      handleY = windowMouseY - 20 - tooltipHeight;
    } else {
      this.tooltip.classList.remove('overflow');
      handleY = windowMouseY + 30;
    }
    this.tooltip.style.top = `${handleY}px`;

    this.timer?.reset();
  }

  _hideTooltip() {
    this.timer?.stop();
    this.tooltip.style.visibility = "hidden";
  }
}
