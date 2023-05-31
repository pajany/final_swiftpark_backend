import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { CustomAdapter, CustomDateParserFormatter } from '../../../../../_metronic/core';
import { CourtesyCard } from '../../../_models/Courtesycard.model';
import { CourtesyCardService, ProductsService } from '../../../_services';

const EMPTY_COURTESTCARD: CourtesyCard = {
  id: undefined,
  lot_no: '',
  card_no: '',
  card_start_no: '',
  card_end_no: '',
  card_pin: '',
  calls: '',
  defaultcalls: 5,
  amount: '',
  card_type: 'Unlimited',
  card_vaild: '',
  status: '1'
};

@Component({
  selector: 'app-edit-courtesycard-modal',
  templateUrl: './edit-courtesycard-modal.component.html',
  styleUrls: ['./edit-courtesycard-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class EditCourtesycardModalComponent implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  isLoading: boolean;
  courtesycard: CourtesyCard;
  formGroup: FormGroup;
  validcard: boolean = false;
  twentyfourhour_permit_checked: boolean = false;
  alphaNumeric = /^[0-9]+$/i;

  private subscriptions: Subscription[] = [];
  public lotList: Subscription[] = [];
  constructor(
    private courtesycardService: CourtesyCardService,
    public productsService: ProductsService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    //this.productsService.fetch();
    this.isLoading$ = this.courtesycardService.isLoading$;
    const sb = this.courtesycardService.isLoading$.subscribe(res => (this.isLoading = res));
    this.subscriptions.push(sb);
    this.loadCourtesycard();
  }

  loadCourtesycard() {
    if (!this.id) {
      this.courtesycard = EMPTY_COURTESTCARD;
      this.loadForm();
    } else {
      const sb = this.courtesycardService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError(errorMessage => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_COURTESTCARD);
          })
        )
        .subscribe((courtesycard: CourtesyCard) => {
          this.courtesycard = courtesycard;
          console.log('edit data', this.courtesycard);
          if (this.courtesycard.card_vaild == '1') {
            this.twentyfourhour_permit_checked = true;
          }

          this.loadForm();
        });

      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    if (!this.courtesycard.id) {
      this.formGroup = this.fb.group({
        lot_no: [this.courtesycard.lot_no, Validators.compose([Validators.required])],
        // card_no: [this.courtesycard.card_no, Validators.compose([Validators.required])],
        card_start_no: [
          this.courtesycard.card_start_no,
          Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])
        ],
        card_end_no: [
          this.courtesycard.card_end_no,
          Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])
        ],

        //card_pin: [this.courtesycard.card_pin, Validators.compose([Validators.required])],
        //calls: [this.courtesycard.calls, Validators.compose([Validators.required])],
        defaultcalls: [this.courtesycard.defaultcalls, Validators.compose([Validators.required])],
        //amount: [this.courtesycard.amount, Validators.compose([Validators.required])],
        card_type: [this.courtesycard.card_type, Validators.compose([Validators.required])],
        card_vaild: [this.courtesycard.card_vaild],
        status: [this.courtesycard.status]
      });
    } else {
      this.formGroup = this.fb.group({
        lot_no: [this.courtesycard.lot_no, Validators.compose([Validators.required])],

        defaultcalls: [this.courtesycard.defaultcalls, Validators.compose([Validators.required])],
        //amount: [this.courtesycard.amount, Validators.compose([Validators.required])],
        card_type: [this.courtesycard.card_type, Validators.compose([Validators.required])],
        card_vaild: [this.courtesycard.card_vaild],
        status: [this.courtesycard.status]
      });
    }
  }

  save() {
    this.prepareCourtesycard();
    if (this.courtesycard.id) {
      this.edit();

      //  $("#msgupdate").show();
      setTimeout(function () {
        $('#msgupdate').show().fadeOut(3000);
      }, 1500);
    } else {
      this.create();

      //$("#msgadd").show();

      setTimeout(function () {
        $('#msgadd').show().fadeOut(2500);
      }, 1500);
    }
  }

  edit() {
    const sbUpdate = this.courtesycardService
      .update(this.courtesycard)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError(errorMessage => {
          this.modal.dismiss(errorMessage);
          return of(this.courtesycard);
        })
      )
      .subscribe(res => (this.courtesycard = res));

    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.courtesycardService
      .create(this.courtesycard)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError(errorMessage => {
          this.modal.dismiss(errorMessage);
          return of(this.courtesycard);
        })
      )
      .subscribe((res: CourtesyCard) => (this.courtesycard = res));
    this.subscriptions.push(sbCreate);
  }

  private prepareCourtesycard() {
    const formData = this.formGroup.value;
    this.courtesycard.lot_no = formData.lot_no;
    this.courtesycard.card_start_no = formData.card_start_no;
    this.courtesycard.card_end_no = formData.card_end_no;
    //this.courtesycard.card_pin = formData.card_pin;
    //this.courtesycard.calls = formData.calls;
    this.courtesycard.defaultcalls = formData.defaultcalls;
    //this.courtesycard.amount = formData.amount;
    this.courtesycard.card_type = formData.card_type;
    this.courtesycard.card_vaild = formData.card_vaild;
    this.courtesycard.status = formData.status;
  }

  keyPressNumberOnly(event) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[0-9-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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

  card_vaild($event) {
    this.validcard = $event && $event.target && $event.target.checked;
  }
}
