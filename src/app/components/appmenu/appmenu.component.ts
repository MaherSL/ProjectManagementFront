import { ComponentconnService } from './../../services/componentconn.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  @HostBinding('class.hide')
  private isHide: boolean = true;
  constructor(private componentconnService:ComponentconnService) { }

  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
    });
  }



}
