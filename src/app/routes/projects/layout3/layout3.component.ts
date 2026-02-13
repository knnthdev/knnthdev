import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../../forms/contact/contact.component';
import { ResponsiveService } from '../../../tools/responsive.service';

@Component({
    selector: 'app-layout3',
    imports: [ContactComponent],
    templateUrl: './layout3.component.html',
    styleUrl: './layout3.component.css'
})
export class Layout3Component implements OnInit {
    constructor(private rs: ResponsiveService) {}
    
    ngOnInit(): void {
        if (this.rs.isLoaded()) {
            this.rs.changeTheme("dark");
        }
    }
}
