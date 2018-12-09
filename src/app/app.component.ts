import { Component, HostBinding } from '@angular/core';
import { ComponentconnService } from './services/componentconn.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostBinding('class.no-margin')
  private isHide: boolean = true;
  constructor(private componentconnService: ComponentconnService, private authService: AuthService,
    private router: Router) { }
  ngOnInit() {
    this.componentconnService.change.subscribe(isOpen => {
      this.isHide = !isOpen;
    });
  }
}
