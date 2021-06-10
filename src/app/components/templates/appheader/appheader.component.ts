import { Component, OnInit, Input, OnChanges, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ComponentconnService } from 'src/app/services/componentconn.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  @HostBinding('class.hide')
  private isHide: boolean = true;
  private nameUser:String;
  private mailUser:String;
  constructor(private componentconnService: ComponentconnService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
      this.nameUser=this.authService.currentNameuser();
      this.mailUser=this.authService.currentMailuser();


    });
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log("non connecté");
  }


}
