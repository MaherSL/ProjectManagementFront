
import { Component, OnInit } from '@angular/core';
import { ProductversionService } from 'src/app/services/productversion.service';

import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { Tproductversion } from '../../entity/Tproductversion';

@Component({
  selector: 'app-productversionlist',
  templateUrl: './productversionlist.component.html',
  styleUrls: ['../../../shared.style.css']
})
export class ProductversionlistComponent implements OnInit {
  private productversionlist: Tproductversion[];
  private isSuppressionActive:boolean=false;

  constructor(private productversionService: ProductversionService, private alertService: AlertService) { }
  ngOnInit() {
    this.getAll();

  }
  getAll() {
    this.productversionService.getAll().subscribe(
      res => { this.productversionlist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  supprimer(id: number) {
    this.productversionService.delete(id)
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


