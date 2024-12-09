import { Component } from '@angular/core';

@Component({
  selector: 'app-grimm-identity',
  imports: [],
  templateUrl: './grimm-identity.component.html',
  styleUrl: './grimm-identity.component.scss'
})
export class GrimmIdentityComponent {
  showData: boolean = true;

  toggleData() {
    this.showData = !this.showData;
  }
}
