import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ComponentconnService {
  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  setVisible(open:boolean){
    this.isOpen = open;
    this.change.emit(this.isOpen);
  }

}
