import { Component, OnInit } from '@angular/core';
import { VocabService } from 'src/app/services/vocab.service';
import { Tvocab } from 'src/app/entity/Tvocab';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vocablist',
  templateUrl: './vocablist.component.html',
  styleUrls: ['./vocablist.component.css']
})
export class VocablistComponent implements OnInit {
  private vocablist: Tvocab[];
  private isSuppressionActive:boolean=false;

  constructor(private vocabService: VocabService, private alertService: AlertService) { }
  ngOnInit() {
    this.getAll();

  }
  getAll() {
    this.vocabService.getAll().subscribe(
      res => { this.vocablist = res },
      error => { this.alertService.error(JSON.stringify(error)); });
  }
  supprimer(id: number) {
    this.vocabService.delete(id)
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
