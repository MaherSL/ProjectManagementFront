
import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Tticket } from 'src/app/entity/Tticket';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';
import { Tproduct } from '../../entity/Tproduct';
import { ProductService } from '../../services/product.service';
import { SearchCriteria } from 'src/app/class/SearchCriteria';
import { OpCriteria } from 'src/app/class/OpCriteria';




@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.css']
})

export class TicketlistComponent implements OnInit {
  /*@ViewChild("name") nameField: ElementRef;
  editName(): void {
    this.nameField.nativeElement.focus();}*/
    //dtOptions: DataTables.Settings = {};
  private searchTerm: string;
  private searchMap:Map<String,SearchCriteria> = new Map();
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
    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };*/

  }
  getAll() {
    this.ticketService.getAll().subscribe(
      res => { this.ticketlist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  getAllProduct() {
    this.productService.getAll().subscribe(
      res => { this.productlist = res
      let p: Tproduct = new Tproduct();
        p.nameproduct="[Tous les produits]";
        p.idproduct=null;
        this.productlist.unshift(p);
       },
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

  /*onFilterIdproduct(idproduct:number)
  {
    if (+idproduct==null){
    this.searchMap.delete("tproduct");
    }else{
    let searchCriteria_ = new SearchCriteria("tproduct.idproduct",OpCriteria.equals,+idproduct);
    this.searchMap.set(searchCriteria_.key,searchCriteria_);}
    this.getByCriterias();

  }*/
  /*onFilterDateSub(nameproduct:string)
  {
    let searchCriteria_ = new SearchCriteria("tproduct.nameproduct",OpCriteria.likeIgnoreCase,"%"+nameproduct+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }*/
  onFilterDate(date:String)
  {
    let searchCriteria_ = new SearchCriteria("dateticket",OpCriteria.likeIgnoreCase,"%"+date+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }




  onFilterStatus(status:string)
  {
    let searchCriteria_ = new SearchCriteria("vocticketstatus.nameword",OpCriteria.likeIgnoreCase,"%"+status+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }



  onFilterProduct(nameproduct:string)
  {
    let searchCriteria_ = new SearchCriteria("tproduct.nameproduct",OpCriteria.likeIgnoreCase,"%"+nameproduct+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }


  onFilterExternalcodea(externalcodea:string)
  {
    let searchCriteria_ = new SearchCriteria("externalcodea",OpCriteria.likeIgnoreCase,"%"+externalcodea+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }
  onFilterSummary(summary:string)
  {
    let searchCriteria_ = new SearchCriteria("summary",OpCriteria.likeIgnoreCase,"%"+summary+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }
  onFilterReporter(reporter:string)
  {
    let searchCriteria_ = new SearchCriteria("treporter.tperson.nameperson",OpCriteria.likeIgnoreCase,"%"+reporter+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }
  onFilterProductversion(productversion:string)
  {
    let searchCriteria_ = new SearchCriteria("tproductversion.nameversion",OpCriteria.likeIgnoreCase,"%"+productversion+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }
  onFilterResolution(resolution:string)
  {
    let searchCriteria_ = new SearchCriteria("vocticketresol.name",OpCriteria.likeIgnoreCase,"%"+resolution+"%");
    this.searchMap.set(searchCriteria_.key,searchCriteria_);
    this.getByCriterias();

  }



  getByCriterias() {
    var arr = Array.from(this.searchMap.values());

    this.ticketService.getByCriterias(arr)
      .subscribe(
        data => {
          this.ticketlist = data;
        },
        error => {
          this.alertService.error(JSON.stringify(error));
        });
  }

  /*onChange($event) {
    console.log(this.selectedProduct);
    this.alertService.success(this.selectedProduct.nameproduct);
    // I want to do something here for new selectedDevice, but what I
    // got here is always last selection, not the one I just select.
}*/

//sorting
key: string = 'name'; //set default
reverse: boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}
p: number = 1;


}


