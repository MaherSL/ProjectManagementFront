import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';
import { Tview } from 'src/app/entity/Tview';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  private viewlist: Tview[];

  constructor(private viewService: ViewService, private alertService: AlertService) { }
  ngOnInit() {
    this.getAll();

  }
  getAll() {
    this.viewService.getAll().subscribe(
      res => { this.viewlist = res },
      error => { this.alertService.error(error); });
  }
  supprimer(id: number) {
    this.viewService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.getAll();
        },
        error => {
          this.alertService.error("Erreur de suppression: " + error);
        });
  }

}
