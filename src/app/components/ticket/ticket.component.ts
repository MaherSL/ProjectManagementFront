
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tticket } from '../../entity/Tticket';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs/operators';

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
  private idticketSelected: number=null;
  private isSuppressionActive:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.tticket = new Tticket();
    //1ere methode
    this.idticketSelected = +this.activatedRoute.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      idticket: [''],
      nameticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      enabledticket: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, { updateOn: 'blur' });
    //updateOn:'submit"'
    
    if (this.idticketSelected != null) {
      this.ticketService.getById(this.idticketSelected).subscribe(
        res => { this.tticket = res; if(this.tticket) this.registerForm.patchValue(this.tticket); },
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
}
