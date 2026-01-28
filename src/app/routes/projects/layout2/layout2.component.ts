import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../tools/responsive.service';

@Component({
    selector: 'app-layout2',
    imports: [],
    templateUrl: './layout2.component.html',
    styleUrl: './layout2.component.css'
})
export class Layout2Component implements OnInit {
    constructor(private rs : ResponsiveService) {
    }

    ngOnInit(): void {
        if (this.rs.isLoaded()) {
            this.rs.changeTheme("light");
        }
    }
}
