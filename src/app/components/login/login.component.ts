import { ComponentconnService } from './../../services/componentconn.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: string;
  private password: string;
  constructor(private componentconnService: ComponentconnService,private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentconnService.setVisible(false);
  }

  /*@HostListener('click')
  click() {
    this.componentconnService.toggle();
  }*/

  onConnecter() {
    //this.document.location.href = 'https://stackoverflow.com';
    //window.location.href ="/index";
    if (this.login != null && this.password != null) {
      this.authService.setLoggin();
      //this.router.navigate(["/index"]);
      console.log("est connecté");
      console.log("end");
      console.log("redirect="+this.authService.redirectUrl);
      if (this.authService.redirectUrl != "") {
        this.router.navigate([this.authService.redirectUrl]);
        this.authService.redirectUrl = "";
      }
      this.componentconnService.setVisible(true);
    }
    else {
      this.authService.setLogout();
      console.log("non connecté");
    }

  }
}
