import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Customer } from '../../../_models/customer.model';
import { CustomersService } from '../../../_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';
import * as $ from 'jquery';

const EMPTY_CUSTOMER: Customer = {
  id: undefined,
  username: '',
  lastname:'',
  email:'',
  password: '',
  pin:'',
  admin_usertype:'swiftpark admin',
  status:'1',
};

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditCustomerModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  customer: Customer;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.customersService.isLoading$;
    this.loadCustomer();
  }

  loadCustomer() {
     
    if (!this.id) {
      this.customer = EMPTY_CUSTOMER;
      this.loadForm();
    } else {
      const sb = this.customersService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_CUSTOMER);
        })
      ).subscribe((customer: Customer) => {
        this.customer = customer;
        // console.log("edit data",customer);
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({  
      username: [this.customer.username, Validators.compose([Validators.required])],
      lastname: [this.customer.lastname, Validators.compose([Validators.required])],
      email: [this.customer.email, Validators.compose([Validators.required])],
      password: [this.customer.password, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      pin: [this.customer.pin, Validators.compose([Validators.required])],
      admin_usertype: [this.customer.admin_usertype, Validators.compose([Validators.required])],
      status: [this.customer.status, Validators.compose([Validators.required])]

    });
  }

  save() {
    this.prepareCustomer();
    if (this.customer.id) {
      this.edit();
     // $("#msgupdate").show();
     setTimeout(function() { $("#msgupdate").show().fadeOut(3000); }, 1500);
     } else {
      this.create();
     // $("#msgadd").show();
     setTimeout(function() { $("#msgadd").show().fadeOut(2500); }, 1500);
     }
  }

  edit() {
    const sbUpdate = this.customersService.update(this.customer).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe(res => this.customer = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.customersService.create(this.customer).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe((res: Customer) => this.customer = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCustomer() {
    const formData = this.formGroup.value;  
    this.customer.username = formData.username;
    this.customer.lastname = formData.lastname;
    this.customer.email = formData.email;
    this.customer.password = formData.password;
    this.customer.pin = formData.pin;
    this.customer.admin_usertype = formData.admin_usertype;
    this.customer.status = formData.status;

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
}
