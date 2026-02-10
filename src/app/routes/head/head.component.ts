import { Component, HostListener, OnInit } from '@angular/core';
import { ResponsiveService } from '../../tools/responsive.service';

@Component({
  selector: 'app-head',
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
})
export class HeadComponent implements OnInit {
  IsHeaderFixed: boolean = false;

  constructor(private rs: ResponsiveService) {}

  ngOnInit() {
    if (this.rs.isLoaded()) {
      window.addEventListener('scroll', this.scrollhandler.bind(this));
    }
  }

  // 

  public scrollhandler(event: any) {
    if (
      document.documentElement.scrollTop > 40
    ) {
      if (this.IsHeaderFixed)
        return;

      var navbar = document.getElementById('navbar');
      navbar!.classList.add('fixed');
      this.IsHeaderFixed = true;
    } else {
      if (!this.IsHeaderFixed)
        return;

      var navbar = document.getElementById('navbar');
      navbar!.classList.remove('fixed');
      this.IsHeaderFixed = false;
    }
  }
}
