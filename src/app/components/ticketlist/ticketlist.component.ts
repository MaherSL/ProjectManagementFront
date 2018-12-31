
import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Tticket } from 'src/app/entity/Tticket';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { Tproduct } from '../../entity/Tproduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.css']
})
export class TicketlistComponent implements OnInit {
  private searchTerm: string;

  private ticketlist: Tticket[];
  private isSuppressionActive:boolean=false;
  private productList:Tproduct[];
  private filterednameproduct:string;

  constructor(private ticketService: TicketService, private alertService: AlertService,
    private productService:ProductService) { }
  ngOnInit() {
    this.getAll();
    this.getAllProduct();


  }
  getAll() {
    this.ticketService.getAll().subscribe(
      res => { this.ticketlist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  getAllProduct() {
    this.productService.getAll().subscribe(
      res => { this.productList = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }



  supprimer(id: number) {
    this.ticketService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.getAll();
        },
        error => {
          this.alertService.error("Erreur de suppression: " + JSON.stringify(error));
        });
  }

  onChangeNameproduct(nameproduct:string)
  {
    this.filterednameproduct=nameproduct;
    this.alertService.success(nameproduct);
    //this.getAll();
  }
  
}


