import { ComponentconnService } from './../../services/componentconn.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-oldappmenu',
  templateUrl: './oldappmenu.component.html',
  styleUrls: ['./oldappmenu.component.css']
})
export class OldappmenuComponent implements OnInit {
  @HostBinding('class.hide')
  private isHide: boolean = true;
  constructor(private componentconnService:ComponentconnService) { }

  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
    });
  }



}
