import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { CourtesyCard } from 'src/app/modules/e-commerce/_models/Courtesycard.model';
import { CustomerEditCourtesyCardService } from 'src/app/modules/e-commerce/_services';
import { ProductsService } from 'src/app/modules/e-commerce/_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';
import * as $ from 'jquery';



const EMPTY_COURTESTCARD: CourtesyCard = {
  id: undefined,
  lot_no:'',
  card_no:'',
  card_start_no:'',
  card_end_no:'',
  card_pin:'',
  calls:'',
  defaultcalls:5,
  amount:'',
  card_type:'Unlimited',
  card_vaild:'',
  status:'1',
};

@Component({
    selector: 'app-cust-courtesycards-edit',
    templateUrl: './cust-courtesycards-edit.component.html',
    styleUrls: ['./cust-courtesycards-edit.component.scss']
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
 
})
export class CustCourtesycardsEditComponent implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  isLoading: boolean;
  courtesycard: CourtesyCard;
  formGroup: FormGroup;
  validcard: boolean = false ; 
  twentyfourhour_permit_checked: boolean =false;

  private subscriptions: Subscription[] = [];
  constructor(
    private customercourtesycardservice: CustomerEditCourtesyCardService,
    public productsService: ProductsService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.productsService.fetch();
    this.isLoading$ = this.customercourtesycardservice.isLoading$;
    this.loadCourtesycard();
  }

  loadCourtesycard() {
    if (!this.id) {
      this.courtesycard = EMPTY_COURTESTCARD;
      this.loadForm();
    } else {
      const sb = this.customercourtesycardservice.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_COURTESTCARD);
        })
      ).subscribe((courtesycard: CourtesyCard) => {
        this.courtesycard = courtesycard;
        console.log("edit data==========",courtesycard.lot_no);

        if(this.courtesycard.card_vaild == '1'){
          this.twentyfourhour_permit_checked= true;
        }

        this.loadForm();
      });

    
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      lot_no: [this.courtesycard.lot_no, Validators.compose([Validators.required])],
      card_no: [this.courtesycard.card_no, Validators.compose([Validators.required])],
      card_pin: [this.courtesycard.card_pin, Validators.compose([Validators.required])],
      calls: [this.courtesycard.calls, Validators.compose([Validators.required])],
      defaultcalls: [this.courtesycard.defaultcalls, Validators.compose([Validators.required])],
      amount: [this.courtesycard.amount, Validators.compose([Validators.required])],
      card_type: [this.courtesycard.card_type, Validators.compose([Validators.required])],
      card_vaild: [this.courtesycard.card_vaild],
      status: [this.courtesycard.status]

    });
  }

  save() {
    this.prepareCourtesycard();
    if (this.courtesycard.id) {
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
    const sbUpdate = this.customercourtesycardservice.update(this.courtesycard).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.courtesycard);
      }),
    ).subscribe(res => this.courtesycard = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.customercourtesycardservice.create(this.courtesycard).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.courtesycard);
      }),
    ).subscribe((res: CourtesyCard) => this.courtesycard = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCourtesycard() {
    const formData = this.formGroup.value;  
    this.courtesycard.lot_no = formData.lot_no;
    this.courtesycard.card_no = formData.card_no;
    this.courtesycard.card_pin = formData.card_pin;
    this.courtesycard.calls = formData.calls;
    this.courtesycard.defaultcalls = formData.defaultcalls;
    this.courtesycard.amount = formData.amount;
    this.courtesycard.card_type = formData.card_type;
    this.courtesycard.card_vaild = formData.card_vaild;
    this.courtesycard.status = formData.status;
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
