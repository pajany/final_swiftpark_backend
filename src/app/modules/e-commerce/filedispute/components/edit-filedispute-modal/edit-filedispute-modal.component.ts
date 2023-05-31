import { Component, NgZone,Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { FileDisputeService } from '../../../_services';
import { FileDispute } from '../../../_models/filedispute.model';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-filedispute-modal',
  templateUrl: './edit-filedispute-modal.component.html',
  styleUrls: ['./edit-filedispute-modal.component.scss']
})
export class EditFiledisputeModalComponent implements OnInit {
  @Input() id: number;
  formGroup: FormGroup;
   
   model: any = {};
   status:any;
   filedispute:FileDispute;

  constructor(
    public filedisputeService: FileDisputeService,
    public router: ActivatedRoute,
    public route: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.status="process";

  }

  
  onOptionsSelected(value:any){

    this.status = value;
    let params: any = {};
    (params.status = value);
    (params.id = this.id);
    this.filedisputeService.submitForm(params).subscribe(
      (data: any) => {   
        this.modal.close();
        
      },
      (error: any) => {
        console.error(error);
      }
    );

   }

 

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}
