
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tproductversion } from '../../entity/Tproductversion';
import { ProductversionService } from '../../services/productversion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-productversion',
  templateUrl: './productversion.component.html',
  styleUrls: ['../../../shared.style.css']
})
export class ProductversionComponent implements OnInit {
  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tproductversion: Tproductversion;
  private idproductversionSelected: number=null;
  private isSuppressionActive:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private productversionService: ProductversionService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.tproductversion = new Tproductversion();
    //1ere methode
    this.idproductversionSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idproductversion: [''],
      nameversion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      dateversion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      numberversion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      enabledversion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      idproduct: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'
    
    if (this.idproductversionSelected != null) {
      this.productversionService.getById(this.idproductversionSelected).subscribe(
        res => { this.tproductversion = res; if(this.tproductversion) this.registerForm.patchValue(this.tproductversion); },
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
    this.productversionService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tproductversion=data;
          this.registerForm.patchValue(this.tproductversion);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }
}

