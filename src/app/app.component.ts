import { Component } from '@angular/core';
import { GrimmIdentityComponent } from "./grimm-identity/grimm-identity.component";

@Component({
  selector: 'app-root',
  imports: [GrimmIdentityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
