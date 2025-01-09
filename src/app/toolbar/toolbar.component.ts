import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() printEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() extraClassesEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() rerollAllEmitter: EventEmitter<boolean> = new EventEmitter();

  enableExtraClasses: boolean = false;

  emitPrintEvent() {
    this.printEmitter.emit(true);
  }

  emitRerollAll() {
    this.rerollAllEmitter.emit(true);
  }

  toggleExtraClasses() {
    this.enableExtraClasses = !this.enableExtraClasses;
    this.extraClassesEmitter.emit(this.enableExtraClasses);
  }

}
