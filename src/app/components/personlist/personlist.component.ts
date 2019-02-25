import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Tperson } from 'src/app/entity/Tperson';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.css']
})
export class PersonlistComponent implements OnInit {
  private personlist: Tperson[];
  private isSuppressionActive:boolean=false;

  constructor(private personService: PersonService, private alertService: AlertService) { }
  ngOnInit() {
    this.getAll();

  }
  getAll() {
    this.personService.getAll().subscribe(
      res => { this.personlist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  supprimer(id: number) {
    this.personService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.getAll();
        },
        error => {
          this.alertService.error("Erreur de suppression: " + JSON.stringify(error));
        });
  }

}


