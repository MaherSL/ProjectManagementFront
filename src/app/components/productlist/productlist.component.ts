import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Tproduct } from 'src/app/entity/Tproduct';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  private productlist: Tproduct[];
  private isSuppressionActive:boolean=false;

  constructor(private productService: ProductService, private alertService: AlertService) { }
  ngOnInit() {
    this.getAll();

  }
  getAll() {
    this.productService.getAll().subscribe(
      res => { this.productlist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  supprimer(id: number) {
    this.productService.delete(id)
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


