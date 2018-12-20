import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tvocab } from '../../entity/Tvocab';
import { VocabService } from '../../services/vocab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.css']
})
export class VocabComponent implements OnInit {
  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tvocab: Tvocab;
  private idvocabSelected: number=null;
  private isSuppressionActive:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private vocabService: VocabService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.tvocab = new Tvocab();
    //1ere methode
    this.idvocabSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idvocab: [''],
      codevocab: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      namevocab: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      enabledvocab: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      fixedvocab: ['', Validators.required]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'
    
    if (this.idvocabSelected != null) {
      this.vocabService.getById(this.idvocabSelected).subscribe(
        res => { this.tvocab = res; if(this.tvocab) this.registerForm.patchValue(this.tvocab); },
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
    this.vocabService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tvocab=data;
          this.registerForm.patchValue(this.tvocab);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }
}
