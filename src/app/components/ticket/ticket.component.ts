
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tticket } from '../../entity/Tticket';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Tproduct } from 'src/app/entity/Tproduct';
import { INgxSelectOption } from 'ngx-select-ex';
import { VocabwordService } from 'src/app/services/vocabword.service';
import { Tvocabword } from 'src/app/entity/Tvocabword';
import { Tproductversion } from 'src/app/entity/Tproductversion';
import { Treporter } from 'src/app/entity/Treporter';
import { ReporterService } from 'src/app/services/reporter.service';
import { Tperson } from 'src/app/entity/Tperson';
import { Item } from 'src/app/class/Item';
import { ProductversionService } from 'src/app/services/productversion.service';
//import { Tperson } from 'src/app/entity/Tperson';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tticket: Tticket;
  private idticketSelected: number = null;
  private isSuppressionActive: boolean = false;
  private productList: Tproduct[] = [];
  private ticketstatusList: Tvocabword[] = [];
  private ticketresolList: Tvocabword[] = [];
  private reporterList:Treporter[]=[];
  private rreporterList:Item[]=[];

private productversionList:Tproductversion[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private vocabwordService: VocabwordService,
    private productService: ProductService,
    private reporterService:ReporterService,
    private productversionService:ProductversionService, 
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }
  
  public doSelectOptions = (options: INgxSelectOption[]) => console.log('SingleDemoComponent.doSelectOptions', options);
  ngOnInit() {
    this.tticket = new Tticket();
    this.tticket.vocticketstatus=new Tvocabword();
    this.tticket.vocticketresol=new Tvocabword();
    this.tticket.tproduct=new Tproduct();
    this.tticket.tproductversion=new Tproductversion();
    this.tticket.treporter=new Treporter();
    this.tticket.treporter.tperson=new Tperson();
    

this.tticket.tproductversion = new Tproductversion();


    this.productService.getAll().subscribe(res => {
      this.productList = res;
    });

    this.vocabwordService.getByCodevocab("VOCTICKETSTATUS").subscribe(res => {
      this.ticketstatusList = res;
    });

    this.vocabwordService.getByCodevocab("VOCTICKETRESOL").subscribe(res => {
      this.ticketresolList = res;
    });

    this.reporterService.getAll().subscribe(res => {
      this.reporterList = res;
      this.reporterList.forEach(y => {this.rreporterList.push(new Item(y.idreporter,y.tperson.nameperson));});

    });


    this.productversionService.getAll().subscribe(res => {
      this.productversionList = res;
    });



    //this.personService.getAll().subscribe(res =>{

    // this.personList = res; });

    //1ere methode
    this.idticketSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idticket: [''],
      dateticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      tproduct: ['', Validators.required],
      vocticketstatus: ['', Validators.required],
      vocticketresol: ['', Validators.required],
      treporter: ['', Validators.required],
      tproductversion: ['', Validators.required],
      externalcodea: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      enabledticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      summary: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'



  /*  if (this.idvocabSelected != null) {
      this.vocabService.getById(this.idvocabSelected).subscribe(
        res => { this.tvocab = res; if(this.tvocab) this.registerForm.patchValue(this.tvocab); },
        error => { this.alertService.error("Erreur : "+JSON.stringify(error)); }
      );
    }

    */
    if (this.idticketSelected != null) {
      this.ticketService.getById(this.idticketSelected).subscribe(
        res => {
        this.tticket = res;
          //console.log("TICKET=" + JSON.stringify(this.tticket));
          if (this.tticket) this.registerForm.patchValue(this.tticket);
        },
        error => { this.alertService.error("Erreur : " + JSON.stringify(error)); }
      );
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.ticketService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tticket=data;
          this.registerForm.patchValue(this.tticket);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }









 /* onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.ticketService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tticket = data;
          this.registerForm.patchValue(this.tticket);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }*/
  getname(person:Tperson)
  {
    console.log("PERSON="+person.nameperson);
    return person.nameperson;
  }
}
