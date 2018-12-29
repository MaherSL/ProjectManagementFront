import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-contentheader',
  templateUrl: './contentheader.component.html',
  styleUrls: ['./contentheader.component.css']
})
export class ContentheaderComponent implements OnInit {
  private nameView: string;

  constructor(private viewService: ViewService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    let url: string = this.router.url;
    //console.log("url="+url);

    this.viewService.getByProgview(url).subscribe(
      res => {
        if (res != null) this.nameView = res.nameview;
        else this.nameView = "-";
      },
      error => { this.alertService.error("Erreur : " + JSON.stringify(error)); }
    );
  }



}
