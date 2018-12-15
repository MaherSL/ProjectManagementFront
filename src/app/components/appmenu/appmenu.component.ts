import { ComponentconnService } from './../../services/componentconn.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { View } from 'src/app/entity/View';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  private viewlist: View[];
  private error: string;

  @HostBinding('class.hide')
  private isHide: boolean = true;
  constructor(private viewService: ViewService, private componentconnService: ComponentconnService) { }

  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
      if (this.isHide) this.hide();
      else this.show();
    });
  }

  hide() {
    this.viewlist=[];

  }
  show() {
    this.viewService.getAll().subscribe(
      res => { this.viewlist = res },
      error => { this.error = error; }
    );
  }




}
