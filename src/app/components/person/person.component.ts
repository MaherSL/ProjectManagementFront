



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { Tperson } from '../../entity/Tperson';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

import { first } from 'rxjs/operators';

//import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

//const URL = 'http://localhost:3000/api/upload';




@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  //public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tperson: Tperson;
  private idpersonSelected: number = null;
  private isSuppressionActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {

/*    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };*/

    this.tperson = new Tperson();
    //1ere methode
    //this.idpersonSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.activatedRoute.snapshot.queryParamMap.get("id") != null)
      this.idpersonSelected = parseFloat(this.activatedRoute.snapshot.queryParamMap.get("id"))
    this.registerForm = this.formBuilder.group({
      idperson: [''],
      nameperson: ['',[Validators.required,Validators.minLength(3)],
      
      ],
      enabledperson: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, {
      validator: this.validatePerson.bind(this)   ,updateOn: 'submit'});
    //{ updateOn: 'blur' }
    //updateOn:'submit"'

    if (this.idpersonSelected != null) {
      this.personService.getById(this.idpersonSelected).subscribe(
        res => { this.tperson = res; if (this.tperson) this.registerForm.patchValue(this.tperson); },
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
    this.personService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tperson = data;
          this.registerForm.patchValue(this.tperson);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }

  /*validateNamePersonNotTaken(control: AbstractControl) {
    let person: Tperson;
    let success: boolean = false;
    this.personService.getByName(control.value).subscribe(
      data => {
        person = data;
        if (person == null) return null;
        else
          return { personTaken: true };
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
    return { personTaken: true };
  }

  



  validatePerson(group : FormGroup) {

    console.log("nameperson="+group.get("nameperson").value);
    console.log("enabledperson="+group.get("enabledperson").value);
    if (group.get("nameperson").value=="ab")
    {
        if (group.get("enabledperson").value==1)
        {
            return {"invalidPerson": true};
        }
    }

    return null;
  }


}




