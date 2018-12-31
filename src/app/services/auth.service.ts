import { Tusersignin } from './../entity/Tusersignin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginid = "currentUsersignin";
  constructor(private http: HttpClient) { }

  login(login: string, password: string) {
    if (login != null && password != null) {
      /*return this.http.post<any>(environment.apiUrl +"/securityapi/signin", { login: login, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));*/

      return this.http.post<Tusersignin>(environment.apiUrl + "/securityapi/signin", { login: login, password: password })
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(this.loginid, JSON.stringify(user));

          }

          return user;
        }));
    }
  }
  /*
      localStorage.setItem(this.isLogged, "true");
      this.isLoggin();
      return "true";
    }
    else
      return "false";*/



  logout() {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin != null) {
      this.http.delete(environment.apiUrl + "/securityapi/logout/" + tusersignin.idusersignin).subscribe(data => { console.log("Utilisateur déconnecté"); localStorage.removeItem(this.loginid); }, error => { console.log("Erreur deconnexion"); localStorage.removeItem(this.loginid); });
      localStorage.removeItem(this.loginid);
    }
  }
  currentNameuser(): string {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin == null) return "";
    return (tusersignin.tuser.tperson.nameperson);
  }

  currentToken(): string {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin == null) return "";
    return (tusersignin.token);
  }

  currentIduser(): number {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin == null) return null;
    return (tusersignin.tuser.iduser);
  }

  currentMailuser(): string {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin == null) return "";
    return (tusersignin.tuser.tperson.emailperson);
  }

  isLoggin(): boolean {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin == null) return false;
    if (tusersignin.idusersignin != null) {
      return true;
    }
    else {
      return false;
    }
  }

  isAuthorized(url: string): boolean {
    let tusersignin: Tusersignin;
    tusersignin = JSON.parse(localStorage.getItem(this.loginid));
    if (tusersignin == null) return false;

    //if(tusersignin.tuser.)
    return true;
  }

  isAccesExpired(): boolean {
    return false;
  }
  isCurrentAccesExpired(): boolean {
    return false;
  }

  loginStatus(url: string): string {
    if (!this.isLoggin()) return "NLOG";//NO LOGGIN
    if (this.isAccesExpired()) return "AEXP";//Acces expired
    if (this.isCurrentAccesExpired()) return "CAEXP";//Current Acces expired
    if (!this.isAuthorized(url)) return "NAUT";//NO AUTHORIZED
    return "OK";
  }
}
