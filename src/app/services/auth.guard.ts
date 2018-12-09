import { ComponentconnService } from './componentconn.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {
  private loginUrl: string = "/login";
  constructor(private componentconnService:ComponentconnService ,private router: Router, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log("url=" + url);
    this.authService.redirectUrl=url;
    return this.verifyLogin(url);
  }

  verifyLogin(url): boolean {
    //return true;
    let status: string;
    status = this.authService.loginStatus(url);
    console.log("status=" + status)
    if (status != "OK") {
      this.router.navigate([this.loginUrl]);
      this.componentconnService.setVisible(false);
      return false;
    }
    else {
      console.log("routerurl=" + this.router.url);
      console.log("url=" + url);
      this.componentconnService.setVisible(true);
      return true;
    }

  }


}
