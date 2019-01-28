
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


//import { nameproductValidator } from 'src/app/nameproductValidator';

import { Tproduct } from '../../entity/Tproduct';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnabledProdValidator } from 'src/app/enabledProdValidator';
import { NameproductValidator } from 'src/app/nameproductValidator';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../shared.style.css'],
 //ca marche avec ou sans providers
  providers: [
    EnabledProdValidator,NameproductValidator // added class in the providers
  ]
// styleUrls: ['./product.component.css'],
  
})
export class ProductComponent implements OnInit {
  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tproduct: Tproduct;
  private idproductSelected: number=null;
  private isSuppressionActive:boolean=false;
  public readonly maxNumber: number = 1;
  constructor(
    
    private readonly http: HttpClient,
    enabledProdValidator: EnabledProdValidator,
    nameproductValidator: NameproductValidator,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      //2eme method without Formbuilder
      this.tproduct = new Tproduct();
this.registerForm = new FormGroup({
  idproduct:new FormControl( ['']),
  nameproduct:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)],nameproductValidator.validate.bind(nameproductValidator)),
  enabledproduct:new FormControl ('', [Validators.required, EnabledProdValidator.validate(this.maxNumber)]),
}, { updateOn: 'blur' }); 
//end validation without formbuilder
     }

 ngOnInit() {
   
   // this.tproduct = new Tproduct();
    //1ere methode with Formbuilder
    /*this.idproductSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idproduct: [''],
      nameproduct: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)], nameproductValidator.validate.bind(nameproductValidator)],
      enabledproduct: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, { updateOn: 'blur' });*/




    //updateOn:'submit"'
    
    if (this.idproductSelected != null) {
      this.productService.getById(this.idproductSelected).subscribe(
        res => { this.tproduct = res; if(this.tproduct) this.registerForm.patchValue(this.tproduct); },
        error => { this.alertService.error("Erreur : "+JSON.stringify(error)); }
      );
    }


  }


//begin validation aymen
hasError(field: string, error: string) {
  const ctrl = this.registerForm.get(field);
  return ctrl.dirty && ctrl.hasError(error);
}

isInvalidAndDirty(field: string) {
  const ctrl = this.registerForm.get(field);
  return !ctrl.valid && ctrl.dirty;
}

/*enregister() {
  console.log(this.registerForm.value);
  this.http.post<object>(`${environment}http://localhost:8181/save`, this.registerForm.value)
    .subscribe(async (data) => {
      for (const fieldName of Object.keys(data)) {
        const serverErrors = data[fieldName];

        const errors = {};
        for (const serverError of serverErrors) {
          errors[serverError] = true;
        }

        const control = this.registerForm.get(fieldName);
        control.setErrors(errors);
        control.markAsDirty();
      }

      
    });
}*/

//end aymen






  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.productService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tproduct=data;
          this.registerForm.patchValue(this.tproduct);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }
}
