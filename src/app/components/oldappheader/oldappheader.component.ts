import { Component, OnInit, Input, OnChanges, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ComponentconnService } from 'src/app/services/componentconn.service';

@Component({
  selector: 'oldapp-appheader',
  templateUrl: './oldappheader.component.html',
  styleUrls: ['./oldappheader.component.css']
})
export class OldappheaderComponent implements OnInit {
  @HostBinding('class.hide')
  private isHide: boolean = true;
  constructor(private componentconnService: ComponentconnService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
    });
  }

  onSignOut() {
    this.authService.setLogout();
    this.router.navigate(['/login']);
    console.log("non connecté");
  }


}
