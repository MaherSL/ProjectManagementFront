import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Tproduct } from '../../entity/Tproduct';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';
import { ValidateNameProductNotTaken } from 'src/app/validators/ValidateNameProductNotTaken';

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
  private idproductSelected: number=null;
  private isSuppressionActive:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.tproduct = new Tproduct();
    //1ere methode
    //this.idproductSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.activatedRoute.snapshot.queryParamMap.get("id")!=null)
      this.idproductSelected = parseFloat(this.activatedRoute.snapshot.queryParamMap.get("id"))
    this.registerForm = this.formBuilder.group({
      idproduct: [''],
      nameproduct: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]/*,
    ValidateNameProductNotTaken.createValidator(this.productService)*/],

      enabledproduct: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'

    if (this.idproductSelected != null) {
      this.productService.getById(this.idproductSelected).subscribe(
        res => { this.tproduct = res; if(this.tproduct) this.registerForm.patchValue(this.tproduct); },
        error => { this.alertService.error("Erreur : "+JSON.stringify(error)); }
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
          this.tproduct=data;
          this.registerForm.patchValue(this.tproduct);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }

  validateNameProductNotTaken(control: AbstractControl) {
    let product:Tproduct;
    let success:boolean=false;
    this.productService.getByName(control.value).subscribe(
      data=> {product=data;
        if (product==null) return null;
        else
        return {productTaken:true};
    },
    error => {
      this.alertService.error(JSON.stringify(error));
      this.loading = false;

    });

    }


/*
    checkEmailNotTaken(control.value).map(res => {
      return res ? null : { emailTaken: true };
    });
  }*/


}
