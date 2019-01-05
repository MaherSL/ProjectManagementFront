import { SearchCriteria } from './../../class/SearchCriteria';
import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';
import { Tview } from 'src/app/entity/Tview';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-viewlist2',
  templateUrl: './viewlist2.component.html',
  styleUrls: ['./viewlist2.component.css']
})
export class Viewlist2Component implements OnInit {
  private viewlist: Tview[];
  private viewlistInitial: Tview[];
  private searchCriteria: SearchCriteria[];
  private isSuppressionActive: boolean = false;
  private filteredView: Tview;

  constructor(private viewService: ViewService, private alertService: AlertService) { }
  ngOnInit() {
    //this.getAll();
    this.filteredView = new Tview();
    this.filteredView.enabledview = 1;
    this.getByTview();
    this.getAllFilter();
    //this.getByCriterias();
  }

  getByTview() {
    /*
    1 exemple
    let tview: Tview = new Tview();
    //tview.idview=1;
    //tview.progview = "/rolelist";
    //tview.enabledview = 1;
    tview.nameview="Produit";
    this.viewService.getByTview(tview)
*/
    this.viewService.getByTview(this.filteredView)
      .subscribe(
        data => {
          this.viewlist = data;

        },
        error => {
          this.alertService.error(JSON.stringify(error));
        });
  }


  onFilterNameview(nameview: string) {

    if (typeof nameview == 'undefined')
      this.filteredView.nameview = null;
    else
      if (nameview != null)
        this.filteredView.nameview = nameview;
      else
        this.filteredView.nameview = "";
    this.getByTview();
  }

  getByCriterias() {
    let searchCriteria_: SearchCriteria;
    searchCriteria_ = new SearchCriteria();
    searchCriteria_.key = "progview";
    searchCriteria_.operation = ":";
    searchCriteria_.value = "/rolelist";
    this.searchCriteria[0] = searchCriteria_;
    this.viewService.getByCriterias(this.searchCriteria)
      .subscribe(
        data => {
          this.viewlist = data;
          this.alertService.success(JSON.stringify(data));
        },
        error => {
          this.alertService.error(JSON.stringify(error));
        });
  }
  getAll() {
    this.viewService.getAll().subscribe(
      res => { this.viewlist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }


  getAllFilter() {
    this.viewService.getAll().subscribe(
      res => {
        this.viewlistInitial = res;
        this.viewlistInitial.unshift(new Tview())
      },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  supprimer(id: number) {
    this.viewService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.getAll();
        },
        error => {
          this.alertService.error("Erreur de suppression: " + JSON.stringify(error));
        });
  }

}
