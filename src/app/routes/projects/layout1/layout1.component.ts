import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../tools/responsive.service';
import { routes } from '../../../app.routes';


@Component({
    selector: 'app-layout1',
    imports: [],
    templateUrl: './layout1.component.html',
    styleUrl: './layout1.component.css'
})
export class Layout1Component implements OnInit {
  constructor(private rs : ResponsiveService) {

  }

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      this.rs.changeTheme("purple");
      
    }
  }
}
