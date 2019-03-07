import { OpCriteria } from "./../../class/OpCriteria";
import { SearchCriteria } from './../../class/SearchCriteria';
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
  private viewlistInitial: Tview[];
  //private searchCriteria: SearchCriteria[]=[];
  private searchMap:Map<String,SearchCriteria> = new Map();
  private isSuppressionActive: boolean = false;
  private filteredView: Tview;

  constructor(private viewService: ViewService, private alertService: AlertService) { }
  ngOnInit() {
    //this.getAll();
    this.filteredView = new Tview();
    this.filteredView.enabledview = 1;
    this.filteredView.nameview = null;

    console.log("1-nameview=" + this.filteredView.nameview);
    //this.getByTview();
    this.getAllFilter();
    this.getByCriterias();
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
    //this.filteredView.nameview = nameview;
    //this.getByTview();
    let searchCriteria_ = new SearchCriteria("nameview",OpCriteria.likeIgnoreCase,"%"+nameview+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    //this.searchCriteria[searchCriteria_.key]=searchCriteria_;
    //console.log("val="+this.searchCriteria);
    //console.log("smap="+this.searchCriteria.length);
    //console.log("val2="+this.searchMap);
    //console.log("smap2="+this.searchMap.size);
    this.getByCriterias();
  }

  onFilterEnabledview(enabledview: number) {
    let searchCriteria_ = new SearchCriteria("enabledview",OpCriteria.likeIgnoreCase,+enabledview);
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();
    //this.filteredView.enabledview = enabledview;
    //this.getByTview();
    //let searchCriteria_ = new SearchCriteria("enabledview",OpCriteria.likeIgnoreCase,enabledview);
    //this.searchMap.set(searchCriteria_.key,searchCriteria_);

  }

  onFilterProgview(progview: string) {
    //console.log("2-progview=" + progview);
    //console.log("3-typof progview=" + typeof progview);
    //console.log("3-!progview=" + !progview);

    //this.filteredView.progview = progview;
    //this.getByTview();

    let searchCriteria_ = new SearchCriteria("progview",OpCriteria.likeIgnoreCase,"%"+progview+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();
  }

  getByCriterias() {
    /*let searchCriteria_: SearchCriteria;
    searchCriteria_ = new SearchCriteria();
    searchCriteria_.key = "progview";
    searchCriteria_.operation = OpCriteria.likeIgnoreCase;
    searchCriteria_.value = "%V%";
    this.searchCriteria.unshift( searchCriteria_);*/
    //this.searchCriteria=[];
    var arr = Array.from(this.searchMap.values());
    this.viewService.getByCriterias(arr)
      .subscribe(
        data => {
          this.viewlist = data;
        },
        error => {
          this.alertService.success(JSON.stringify(arr));
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
        let v: Tview = new Tview();
        v.nameview = "";
        v.progview = "";
        this.viewlistInitial.unshift(v);
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
