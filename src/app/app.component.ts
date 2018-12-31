import { Component, HostBinding, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ComponentconnService } from './services/componentconn.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { SyspagenotfoundComponent } from './syspagenotfound/syspagenotfound.component';
import { Subject } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  private isHide: boolean = true;
  constructor(private cd: ChangeDetectorRef,private componentconnService: ComponentconnService, private authService: AuthService,
    private router: Router) {
  }
  ngOnInit() {
    console.log("ngOnInt debut");
        this.componentconnService.change.subscribe(isOpen => {
          console.log("valuechangeto : "+isOpen);
          this.isHide=!isOpen;
          //if(isOpen) this.afficher="t"; else this.afficher="f";
          this.refreshBody();
        }, error => {
          console.log("valuechangeErr");
          //this.afficher="f";
          this.isHide=true;
          this.refreshBody();
        });
        console.log("ngOnInt fin");
    }




  /*affichermenu(): boolean {
    if (this.afficher == 't') return true;
    return false;
  }*/
  refreshBody() {
    let body = document.getElementsByTagName('body')[0];
    let n = body.classList.length;
    for (var i = n - 1; i >= 0; i--) {
      body.classList.remove(body.classList[i]);
    }
    body.classList.add("hold-transition");
    if (!this.isHide) {
      body.classList.add("skin-blue");
      body.classList.add("sidebar-mini");
      body.classList.add("fixed");
      body.classList.add("wrapper");
    } else {
      body.classList.add("login-page");
    }
  }
}
