import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../tools/responsive.service';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-layout2',
    imports: [RouterLink],
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
