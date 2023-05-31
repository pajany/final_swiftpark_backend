import { Component, NgZone,Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-error-modal-component',
  templateUrl: './error-modal-component.component.html',
  styleUrls: ['./error-modal-component.component.scss']
})
export class ErrorModalComponentComponent  implements OnInit {
  @Input() message: string;
  formGroup: FormGroup;
   
   model: any = {};
   status:any;

  constructor(
    public router: ActivatedRoute,
    public route: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log("this.status=====",this.message);
  }

  
  

 

  // helpers for View
 

}
