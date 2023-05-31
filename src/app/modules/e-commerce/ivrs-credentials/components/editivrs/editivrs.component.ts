import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ProductsService } from '../../../_services';

import { IvrsPage } from '../../../_models/ivrs.model';
import { ivrsService } from '../../../_services';

const EMPTY_COURTESTCARD: IvrsPage = {
  id: undefined,
  lot_no: undefined,
  name: '',
  pin: undefined
};

@Component({
  selector: 'app-editivrs',
  templateUrl: './editivrs.component.html',
  styleUrls: ['./editivrs.component.scss']
})
export class EditivrsComponent implements OnInit, OnDestroy {
  @Input() id: number;

  isLoading$;
  IvrsPage: IvrsPage;
  formGroup: FormGroup;
  validcard: boolean = false;
  twentyfourhour_permit_checked: boolean = false;
  lotList: any[] = [];
  isLoading: boolean;
  private subscriptions: Subscription[] = [];
  constructor(public ivrsService: ivrsService, private fb: FormBuilder,
    public productsService: ProductsService,
     public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.isLoading$ = this.ivrsService.isLoading$;
    this.productsService.custfetch();
    this.ivrsService.getLotNo().subscribe(result => {
      this.lotList = result;
    });
    const sb = this.ivrsService.isLoading$.subscribe(res => (this.isLoading = res));
    this.subscriptions.push(sb);
    this.loadCourtesycard();
  }

  loadCourtesycard() {
    if (!this.id) {
      this.IvrsPage = EMPTY_COURTESTCARD;
      this.loadForm();
    } else {
      const sb = this.ivrsService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError(errorMessage => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_COURTESTCARD);
          })
        )
        .subscribe((IvrsPage: IvrsPage) => {
          this.IvrsPage = IvrsPage;
          console.log('edit data', IvrsPage.lot_no);
          this.loadForm();
        });

      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      lot_no: [this.IvrsPage.lot_no, Validators.compose([Validators.required])],
      name: [this.IvrsPage.name, Validators.compose([Validators.required])],
      pin: [this.IvrsPage.pin, Validators.compose([Validators.required])]
    });
  }

  save() {
    this.prepareCourtesycard();
    if (this.IvrsPage.id) {
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
    const sbUpdate = this.ivrsService
      .update(this.IvrsPage)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError(errorMessage => {
          this.modal.dismiss(errorMessage);
          return of(this.IvrsPage);
        })
      )
      .subscribe(res => (this.IvrsPage = res));
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.ivrsService
      .create(this.IvrsPage)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError(errorMessage => {
          this.modal.dismiss(errorMessage);
          return of(this.IvrsPage);
        })
      )
      .subscribe((res: IvrsPage) => (this.IvrsPage = res));
    this.subscriptions.push(sbCreate);
  }

  private prepareCourtesycard() {
    const formData = this.formGroup.value;
    this.IvrsPage.lot_no = formData.lot_no;
    this.IvrsPage.name = formData.name;
    this.IvrsPage.pin = formData.pin;
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
