import { Component } from '@angular/core';
import { BrevoService } from '../../../tools/brevo.service';

@Component({
    selector: 'app-layout1',
    imports: [],
    templateUrl: './layout1.component.html',
    styleUrl: './layout1.component.sass'
})
export class Layout1Component {
  constructor(private brevo: BrevoService) {

  }
}
