import { SyncValidProduct } from './SyncValidProduct.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { Tproduct } from '../../entity/Tproduct';
import { UniqueNameproductValidator } from './AsyncValidProduct';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tproduct: Tproduct;
  private idproductSelected: number = null;
  private isSuppressionActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uniqueNameproductValidator: UniqueNameproductValidator//,//,
    //private validateNameProductNotTaken: ValidateNameProductNotTaken
    //,
    //formState: any = null
    //validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    //asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null

  ) { }

  ngOnInit() {
    this.tproduct = new Tproduct();
    //1ere methode
    //this.idproductSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.activatedRoute.snapshot.queryParamMap.get("id") != null)
      this.idproductSelected = parseFloat(this.activatedRoute.snapshot.queryParamMap.get("id"))
    this.registerForm = this.formBuilder.group({
      idproduct: [''],
      nameproduct: ['',[Validators.required,Validators.minLength(3),SyncValidProduct.ValueValidator],
      /*{asyncValidators: this.uniqueNameproductValidator.validate.bind(this.uniqueNameproductValidator),
        updateOn: 'blur'}*/
        this.uniqueNameproductValidator.validate.bind(this.uniqueNameproductValidator)
/*
      [Validators.required, Validators.minLength(3), Validators.maxLength(20),ValidationService.emailValidator,
        AsyncValidProduct.validate]*/


        //  ValidateNameProductNotTaken.createValidator(this.productService)
        //this.validateNameProductNotTaken.validate
        /*this.validateEmailNotTaken.bind(this)*/
      ],
      enabledproduct: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, {
      validator: this.validateProduct.bind(this)   ,updateOn: 'submit'});
    //{ updateOn: 'blur' }
    //updateOn:'submit"'

    if (this.idproductSelected != null) {
      this.productService.getById(this.idproductSelected).subscribe(
        res => { this.tproduct = res; if (this.tproduct) this.registerForm.patchValue(this.tproduct); },
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
    this.productService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tproduct = data;
          this.registerForm.patchValue(this.tproduct);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }

  /*validateNameProductNotTaken(control: AbstractControl) {
    let product: Tproduct;
    let success: boolean = false;
    this.productService.getByName(control.value).subscribe(
      data => {
        product = data;
        if (product == null) return null;
        else
          return { productTaken: true };
      },
      error => {
        this.alertService.error(JSON.stringify(error));
        this.loading = false;

      });
*/



/*
    checkEmailNotTaken(control.value).map(res => {
      return res ? null : { emailTaken: true };
    });
  }*/

  validateEmailNotTaken(control: AbstractControl) {
    console.log("aaaaa");
    return { productTaken: true };
  }

  afficherErreur(erreur:string){
    return SyncValidProduct.getValidatorErrorMessage(erreur);
  }



  validateProduct(group : FormGroup) {

    console.log("nameproduct="+group.get("nameproduct").value);
    console.log("enabledproduct="+group.get("enabledproduct").value);
    if (group.get("nameproduct").value=="ab")
    {
        if (group.get("enabledproduct").value==1)
        {
            return {"invalidProduct": true};
        }
    }

    return null;
  }


}

