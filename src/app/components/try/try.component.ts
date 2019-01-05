import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Tticket } from 'src/app/entity/Tticket';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { Tproduct } from '../../entity/Tproduct';
import { ProductService } from '../../services/product.service';
declare var $;




@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent implements OnInit {
  private searchTerm: string;

  private ticketlist: Tticket[];
  private isSuppressionActive:boolean=false;
  private productlist:Tproduct[];
  private filterednameproduct:string;
  private selectedTicket:Tticket;
  private selectedProduct:Tproduct;






  @ViewChild('dataTable') table:ElementRef;
  dataTable: any;
  constructor(private ticketService: TicketService, private alertService: AlertService,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.dataTable =$(this.table.nativeElement);
    this.dataTable.dataTable();
    //throw new Error("Method not implemented.");
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
      res => { this.productlist = res },
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

  onFilterIdproduct(idproduct:string)
  {
    this.filterednameproduct=idproduct;
    
    this.alertService.success(idproduct);
    
    //this.getAll();
  }


}
