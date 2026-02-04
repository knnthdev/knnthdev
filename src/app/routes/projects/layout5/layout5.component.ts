import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../tools/responsive.service';

@Component({
  selector: 'app-layout5',
  imports: [],
  templateUrl: './layout5.component.html',
  styleUrl: './layout5.component.css'
})
export class Layout5Component implements OnInit {
  constructor(private rs: ResponsiveService) { }

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      this.rs.changeTheme("yellow");
    }
  }
}
