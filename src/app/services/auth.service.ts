import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = "isLoggedIn2";
  public redirectUrl;
  constructor() { }

  setLoggin() {
    localStorage.setItem(this.isLogged, "true");
    console.log("setloggin");
    console.log("testIslogin");
    this.isLoggin();
    console.log("ENDtestIslogin");
  }

  setLogout() {
    localStorage.setItem(this.isLogged, "false");
    console.log("setlogout");
  }

  isLoggin(): boolean {
    //return true;
    if (localStorage.getItem(this.isLogged) == "true") {
      console.log("testLogin=true");
      return true;
    }
    else {
      console.log("testLogin=false");
      return false;
    }
  }

  isAuthorized(url:string): boolean{
    return true;
  }

  isAccesExpired(): boolean{
    return false;
  }
  isCurrentAccesExpired(): boolean{
    return false;
  }

  loginStatus(url:string):string{
    if (!this.isLoggin()) return "NLOG";//NO LOGGIN
    if(this.isAccesExpired()) return "AEXP";//Acces expired
    if(this.isCurrentAccesExpired()) return "CAEXP";//Current Acces expired
    if (!this.isAuthorized(url)) return "NAUT";//NO AUTHORIZED
    return "OK";
  }
}
