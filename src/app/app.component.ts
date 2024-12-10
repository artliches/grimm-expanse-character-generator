import { Component } from '@angular/core';
import { GrimmIdentityComponent } from "./grimm-identity/grimm-identity.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [GrimmIdentityComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  print() {
    window.print();
  }
}
