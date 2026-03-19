import { Component, OnInit } from '@angular/core';
import { ResponsiveService, AnalyticsService } from '@services';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout3',
    imports: [RouterModule],
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
    constructor(private rs: ResponsiveService, public analytics: AnalyticsService) {}
    
    ngOnInit(): void {
        if (this.rs.isLoaded()) {
            this.rs.changeTheme("dark");
        }
    }
}
