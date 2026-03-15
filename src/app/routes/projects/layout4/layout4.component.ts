import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../tools/responsive.service';
import { RouterModule } from '@angular/router';
import { $ } from '../../../tools/extensions.module';

@Component({
    selector: 'app-layout4',
    imports: [RouterModule],
    templateUrl: './layout4.component.html',
    styleUrl: './layout4.component.css'
})
export class Layout4Component implements OnInit {
    constructor(private rs: ResponsiveService) { }

    ngOnInit(): void {
        this.rs.changeTheme("pearl");
    }
}
