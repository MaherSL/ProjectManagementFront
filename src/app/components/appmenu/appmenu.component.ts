import { ComponentconnService } from './../../services/componentconn.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';
import { Tview } from 'src/app/entity/Tview';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  private viewlist: Tview[];
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
