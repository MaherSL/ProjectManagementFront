import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewService } from 'src/app/services/view.service';
import { AlertService } from 'src/app/services/alert.service';
import { first, switchMap } from 'rxjs/operators';
import { Tview } from 'src/app/entity/Tview';
//import { AlertService, UserService } from '../_services';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private registerForm: FormGroup;
  private loading = false;
  private submitted = false;
  private tview: Tview;
  private idviewSelected: number;
  private isSuppressionActive:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private viewService: ViewService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.tview = new Tview();
    //1ere methode
    this.idviewSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idview: [''],
      nameview: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      progview: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)],],
      enabledview: ['', Validators.required]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'
    //2eme methode
    /*this.activatedRoute.paramMap.subscribe(params => {
      this.idview = +params.get("id")

    })*/
    /*this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.idview = +params.get('id');
        this.viewService.getById(this.idview);
      })
*/
    /* QUERY PARAMETER
    this.name = this.route.snapshot.queryParamMap.get("paramName")
    this.route.queryParamMap.subscribe(queryParams => {
      this.name = queryParams.get("paramName")
    })
    this.activatedRoute.queryParams.subscribe(params => {
            const userId = params['userId'];
            console.log(userId);
            cas de ?userId=
          });
          */
    /*
    Une autre solution avec switchmap
    import { switchMap } from "rxjs/operators" // RxJS v6
ngOnInit() {
 this.route.paramMap.pipe(
   switchMap(params => {
     this.animal = params.get("animal")
   })
 )
}*/

    if (this.idviewSelected != null) {
      this.alertService.success("test");
      this.viewService.getById(this.idviewSelected).subscribe(
        res => { this.tview = res; this.registerForm.patchValue(this.tview) },
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
    this.viewService.save(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement fait avec succès');
          this.loading = false;
          this.tview=data;
          this.registerForm.patchValue(this.tview);
          //        this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(JSON.stringify(error));
          this.loading = false;
        });
  }
}
