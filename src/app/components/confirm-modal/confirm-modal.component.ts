import { Component, OnInit, Input } from '@angular/core';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() cid: string;
  @Input() ctitle: string;
  @Input() cmessage: string;

  //constructor(private _modalService: NgbModal) { }

  
  ngOnInit() {
    console.log("id="+this.cid);
  }

}
