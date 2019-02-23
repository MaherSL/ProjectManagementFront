
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
  private ticketlist: Tticket[] = [];
  private productList: Tproduct[] = [];



  public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];
  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private productService: ProductService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }






    private value='Amsterdam';
    private _disabledV:string = '0';
    private disabled:boolean = false;
   
    private get disabledV():string {
      return this._disabledV;
    }
   
    private set disabledV(value:string) {
      this._disabledV = value;
      this.disabled = this._disabledV === '1';
    }
   
    public selected(value:any):void {
      console.log('Selected value is: ', value);
    }
   
    public removed(value:any):void {
      console.log('Removed value is: ', value);
    }
   
    public typed(value:any):void {
      console.log('New search input: ', value);
    }
   
    public refreshValue(value:any):void {
      this.value = value;
    }
  
















  defvalue() {
    return this.tticket.tproduct.idproduct;
  }
  public doSelectOptions = (options: INgxSelectOption[]) => console.log('SingleDemoComponent.doSelectOptions', options);
  ngOnInit() {
    this.tticket = new Tticket();
    this.productService.getAll().subscribe(res => {
      this.productList = res;
    });
    //1ere methode
    this.idticketSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idticket: [''],
      dateticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      status: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      externalcodea: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      nameticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      enabledticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      summary: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'

    if (this.idticketSelected != null) {
      this.ticketService.getById(this.idticketSelected).subscribe(
        res => { this.tticket = res; if (this.tticket) this.registerForm.patchValue(this.tticket); },
        error => { this.alertService.error("Erreur : " + JSON.stringify(error)); }
      );
    }

    if (this.idticketSelected != null) {
      this.ticketService.getAll().subscribe(
        res => { this.ticketlist = res },
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
          this.tticket = data;
          this.registerForm.patchValue(this.tticket);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }
}
