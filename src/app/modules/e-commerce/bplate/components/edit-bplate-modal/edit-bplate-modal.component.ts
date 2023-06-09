import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Customer } from '../../../_models/customer.model';
 
import { Bplate } from '../../../_models/bplate.model';
import { BplateService } from '../../../_services';
import { ProductsService } from '../../../_services';
import { CustomersService } from '../../../_services';
 import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';
import * as $ from 'jquery';

const EMPTY_COURTESTCARD: Bplate = {
  id: undefined,
  lot_no:'',
  plate_no:''
};


@Component({
  selector: 'app-edit-bplate-modal',
  templateUrl: './edit-bplate-modal.component.html',
  styleUrls: ['./edit-bplate-modal.component.scss']
})
export class EditBplateModalComponent implements OnInit {

  @Input() id: number;

  isLoading$;
  Bplate: Bplate;
  formGroup: FormGroup;
  validcard: boolean = false ; 
  alphaNumeric =(/^[a-z0-9]+$/i);

  private subscriptions: Subscription[] = [];
  constructor(
    private Bplateservice: BplateService,
    public productsService: ProductsService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

 
  ngOnInit(): void {
    this.productsService.custfetch();
    this.isLoading$ = this.Bplateservice.isLoading$;
    this.loadCourtesycard();

  }

  loadCourtesycard() {
    if (!this.id) {
      this.Bplate = EMPTY_COURTESTCARD;
      this.loadForm();
    } else {
      const sb = this.Bplateservice.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_COURTESTCARD);
        })
      ).subscribe((Bplate: Bplate) => {
        this.Bplate = Bplate;
 
        this.loadForm();
      });

    
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      lot_no: [this.Bplate.lot_no, [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]],
      plate_no: [this.Bplate.plate_no, Validators.compose([Validators.required])]
    

    });
  }

  save() {
    this.prepareCourtesycard();
    if (this.Bplate.id) {
      this.edit();

    //  $("#msgupdate").show();
      setTimeout(function() { $("#msgupdate").show().fadeOut(3000); }, 1500);

    } else {
      this.create();

      //$("#msgadd").show();
      
      setTimeout(function() { $("#msgadd").show().fadeOut(2500); }, 1500);
    }
  }

  edit() {
    const sbUpdate = this.Bplateservice.update(this.Bplate).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.Bplate);
      }),
    ).subscribe(res => this.Bplate = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.Bplateservice.create(this.Bplate).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.Bplate);
      }),
    ).subscribe((res: Bplate) => this.Bplate = res);
    this.subscriptions.push(sbCreate);
  }

  keyPressAlphaNumericWithCharacters(event) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  private prepareCourtesycard() {
    const formData = this.formGroup.value;   
    this.Bplate.lot_no = formData.lot_no;
    this.Bplate.plate_no = formData.plate_no;
  } 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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

  card_vaild($event){
    this.validcard  =  $event && $event.target && $event.target.checked;
  }

}
