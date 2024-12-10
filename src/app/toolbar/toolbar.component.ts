import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() printEmitter: EventEmitter<boolean> = new EventEmitter();

  emitPrintEvent() {
    this.printEmitter.emit(true);
  }

}
