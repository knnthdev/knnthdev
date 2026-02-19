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
    public prices = {
        economic: {
            name: "Plan Económico",
            price: 160,
            maxprice: 160,
        },
        professional: {
            name: "Plan Profesional",
            price: 175,
            maxprice: 175
        },
        business: {
            name: "Plan Negocios",
            price: 250,
            maxprice: 250
        },
        startup: {
            name: "Plan Emprendedores",
            price: 75,
            maxprice: 89.99
        }
    }
    constructor(private rs: ResponsiveService) {}
    
    ngOnInit(): void {
        if (this.rs.isLoaded()) {
            this.rs.changeTheme("dark");
        }
    }
}
