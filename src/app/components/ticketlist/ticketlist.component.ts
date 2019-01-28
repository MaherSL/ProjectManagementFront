
import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Tticket } from 'src/app/entity/Tticket';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { Tproduct } from '../../entity/Tproduct';
import { ProductService } from '../../services/product.service';




@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['../../../shared.style.css']
})

export class TicketlistComponent implements OnInit {
  /*@ViewChild("name") nameField: ElementRef;
  editName(): void {
    this.nameField.nativeElement.focus();}*/

  private searchTerm: string;
  //private searchDate: Date;


  private ticketlist: Tticket[];
  private isSuppressionActive:boolean=false;
  private productlist:Tproduct[];
  private filterednameproduct:string;
  

  private selectedTicket:Tticket;
  private selectedProduct:Tproduct;

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





  /*onChange($event) {
    console.log(this.selectedProduct);
    this.alertService.success(this.selectedProduct.nameproduct);
    // I want to do something here for new selectedDevice, but what I
    // got here is always last selection, not the one I just select.
}*/
  
}


