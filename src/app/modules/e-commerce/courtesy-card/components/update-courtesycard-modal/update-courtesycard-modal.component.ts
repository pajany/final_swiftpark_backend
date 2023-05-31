import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CourtesyCard } from '../../../_models/Courtesycard.model';
import { CourtesyCardService, ProductsService } from '../../../_services';

@Component({
  selector: 'app-update-courtesycard-modal',
  templateUrl: './update-courtesycard-modal.component.html',
  styleUrls: ['./update-courtesycard-modal.component.scss']
})
export class UpdateCourtesycardModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
  status = 2;
  courtesycards: CourtesyCard[] = [];
  isLoading = false;
  subscriptions: Subscription[] = [];
  twentyfourhour_permit_checked: boolean = false;
  constructor(
    private courtesyCardService: CourtesyCardService,
    public productsService: ProductsService,
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) {}
  formGroup: FormGroup;
  ngOnInit(): void {
    console.log('hi', this.ids);
    this.loadForm();
    this.productsService.fetch();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      lot_no: ['', Validators.compose([Validators.required])],
      defaultcalls: [0, Validators.compose([Validators.required])],
      card_type: ['', Validators.compose([Validators.required])],
      card_vaild: [''],
      status: ['']
    });
  }
  updateCustomersStatus() {
    this.isLoading = true;
    if (this.formGroup.valid) {
      const params = {
        ids: this.ids,
        lot_no: this.formGroup.value.lot_no,
        defaultcalls: this.formGroup.value.defaultcalls,
        card_type: this.formGroup.value.card_type,
        card_vaild: this.formGroup.value.card_vaild,
        status: this.formGroup.value.status
      };
      this.courtesyCardService.UpdateCourtesyCard(params).subscribe(
        (data: any) => {
          this.modal.close();
          setTimeout(function () {
            $('#msgupdate').show().fadeOut(3000);
          }, 1500);
        },
        error => {
          this.isLoading = false;
          this.modal.dismiss(error);
          console.error(error);
        }
      );
    }

    // const sb = this.courtesyCardService.updateStatusForItems(this.ids, +this.status).pipe(
    //   delay(1000), // Remove it from your code (just for showing loading)
    //   tap(() => this.modal.close()),
    //   catchError((errorMessage) => {
    //     this.modal.dismiss(errorMessage);
    //     return of(undefined);
    //   }),
    //   finalize(() => {
    //     this.isLoading = false;
    //   })
    // ).subscribe();
    // this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

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
    // this.validcard  =  $event && $event.target && $event.target.checked;
  }
}
