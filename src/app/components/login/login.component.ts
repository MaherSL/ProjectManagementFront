import { AlertService } from './../../services/alert.service';
import { ComponentconnService } from './../../services/componentconn.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: string;
  private password: string;
  private returnUrl: string;
  constructor(private componentconnService: ComponentconnService, private alertService: AlertService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentconnService.setVisible(false);
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.logout();
  }

  /*@HostListener('click')
  click() {
    this.componentconnService.toggle();
  }*/

  onConnecter() {
    //this.document.location.href = 'https://stackoverflow.com';
    //window.location.href ="/index";
    if (this.login != null && this.password != null) {
      this.authService.login(this.login, this.password).subscribe(data => {
        this.componentconnService.setVisible(true);
        this.router.navigate([this.returnUrl]);


      }, error => { this.alertService.error("Login / password incorrect"); });
    }
    else {
      this.alertService.error("Veuillez saisir login et mot de passe");
    }


  }
}
