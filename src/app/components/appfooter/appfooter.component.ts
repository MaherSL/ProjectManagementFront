import { Component, OnInit, HostBinding } from '@angular/core';
import { ComponentconnService } from 'src/app/services/componentconn.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.css']
})
export class AppfooterComponent implements OnInit {

  @HostBinding('class.hide')
  private isHide: boolean = true;
  constructor(private componentconnService: ComponentconnService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
    });
  }

}
