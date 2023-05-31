import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import * as $ from 'jquery';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../_models/product.model';
import { ProductsService } from '../../_services';

const EMPTY_PRODUCT: Product = {
  id: undefined,
  lot_no: '',
  located: '',
  client_name: '',
  qrcode_img:'',
  address: '',
  note:'',
  city: '',
  state: '',
  zipcode: '',
  timezone: '',
  phone: '',
  fax: '',
  cell: '',
  email: '',
  keycontact: '',
  taxable: 'Yes',

  month_permit: '',
  day_permit: '',
  hourly_permit: '',
  hourly: '',
  twentyfourhour: '',
  thirtyday: '',
  tax_amount: '',
  permits_sold: '',
  client_web: '',
  password: '',
  lot_active:'',
  allday: '',
  allday_permit_amount: '',
  allday_permit: '',
  alldaytime: '',
  overnight_permit_amount: '',
  overnight_permit: '',
  courtesy_charge: '',
  swift_charge: '',
  overnighttime: '',
  overnight: '',
  fromdate: undefined,
  todate: undefined
};

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  product: Product;
  previous: Product;
  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage = '';

  tabs = {
    BASIC_TAB: 0,
    REMARKS_TAB: 1,
    SPECIFICATIONS_TAB: 2
  };
  activeTabId = this.tabs.BASIC_TAB; // 0 => Basic info | 1 => Remarks | 2 => Specifications
  private subscriptions: Subscription[] = [];
  public saveUsername: boolean;
  isShown: boolean = false;
  hourshown: boolean = false;
  hourlyshown: boolean = false;
  alldayshown: boolean = false;
  overnightshown: boolean = false;
  showtaxable: boolean = false;
  checked: boolean = false;
  twentyfourhour_permit_checked: boolean = false;
  hour_permit_checked: boolean = false;
  allday_permit_checked: boolean = false;
  overnight_permit_checked: boolean = false;
  taxable_checked: any;
  qrimagepath:any;
  checklotno: any;
  ExistLOTNOError: any;
  checkedval: any;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.productsService.isLoading$;
    console.log("isLoading+++++++g",this.productsService.isLoading$);
    this.loadProduct();
  }

  loadProduct() {
    const sb = this.route.paramMap
      .pipe(
        switchMap(params => {
          // get id from URL
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.productsService.getItemById(this.id);
          }
          return of(EMPTY_PRODUCT);
        }),
        catchError(errorMessage => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: Product) => {
        if (!res) {
          this.router.navigate(['/products'], { relativeTo: this.route });
        }

        this.product = res;
        this.previous = Object.assign({}, res);
        this.loadForm();
        console.log('edit data', this.product);
        if (this.product.thirtyday == '30 Days') {
          this.checked = true;
        }
        if (this.product.twentyfourhour == '24 Hours Permit') {
          this.twentyfourhour_permit_checked = true;
        }

        if (this.product.hourly == 'Hourly') {
          this.hour_permit_checked = true;
        }

        if (this.product.allday == 'All Day') {
          this.allday_permit_checked = true;
        }

        if (this.product.overnight == 'Over Night') {
          this.overnight_permit_checked = true;
        }

        if (this.product.taxable == 'Yes') {
          this.taxable_checked = 'Yes';
        }

         
          this.qrimagepath =this.product['qrimage'];
          console.log("imaggggggg++++++++++++g",this.qrimagepath);
        

      });
    this.subscriptions.push(sb);
  }

  loadForm() {
    if (!this.product) {
      return;
    }


    this.formGroup = this.fb.group({
      lot_no: [this.product.lot_no, [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]],
      located: [this.product.located, Validators.required],
      qrcode_img: [this.product.qrcode_img],
      client_name: [this.product.client_name, Validators.required],
      address: [this.product.address, Validators.required],
      note: [this.product.note, Validators.required],
      city: [this.product.city, Validators.required],
      state: [this.product.state, Validators.required],
      zipcode: [this.product.zipcode, Validators.required],
      phone: [this.product.phone, Validators.required],
      timezone: [this.product.timezone, Validators.required],
      fax: [this.product.fax, Validators.required],
      cell: [this.product.cell, Validators.required],
      email: [this.product.email, Validators.required],
      keycontact: [this.product.keycontact, Validators.required],
      taxable: [this.product.taxable, Validators.required],
      tax_amount: [this.product.tax_amount],
      month_permit: [this.product.month_permit],
      twentyfourhour: [this.product.twentyfourhour],
      thirtyday: [this.product.thirtyday],
      day_permit: [this.product.day_permit],
      hourly_permit: [this.product.hourly_permit],
      hourly: [this.product.hourly],

      allday: [this.product.allday],
      allday_permit_amount: [this.product.allday_permit_amount],
      allday_permit: [this.product.allday_permit],
      alldaytime: [this.product.alldaytime],
      overnighttime: [this.product.overnighttime],
      overnight: [this.product.overnight],
      overnight_permit_amount: [this.product.overnight_permit_amount],
      overnight_permit: [this.product.overnight_permit],

      permits_sold: [this.product.permits_sold, Validators.required],
      courtesy_charge: [this.product.courtesy_charge, Validators.required],
      swift_charge: [this.product.swift_charge, Validators.required],
      client_web: [this.product.client_web, Validators.required],
      password: [this.product.password, Validators.required],
      lot_active: [this.product.lot_active]
    });
  }

  reset() {
    if (!this.previous) {
      return;
    }
    this.product = Object.assign({}, this.previous);
    this.loadForm();
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.checkedval = $('input[name="thirtyday"]:checked').length;
    if (!this.checkedval) {
      alert('You must check at least one Permit Type.');
      return false;
    }

    const formValues = this.formGroup.value;

    this.product = Object.assign(this.product, formValues);
    if (this.id) {
      this.edit();
      setTimeout(function () {
        $('#msgupdate').show().fadeOut(3000);
      }, 1500);
    } else {
      this.create();
      setTimeout(function () {
        $('#msgadd').show().fadeOut(2500);
      }, 1500);
    }
  }

  edit() {
    const sbUpdate = this.productsService
      .update(this.product)
      .pipe(
        tap(() => this.router.navigate(['/superadmin/products'])),
        catchError(errorMessage => {
          console.error('UPDATE ERROR', errorMessage);
          return of(this.product);
        })
      )
      .subscribe(res => (this.product = res));

    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.productsService
      .create(this.product)
      .pipe(
        tap(() => this.router.navigate(['/superadmin/products'])),
        catchError(errorMessage => {
          console.error('UPDATE ERROR', errorMessage);
          return of(this.product);
        })
      )
      .subscribe(res => (this.product = res as Product));
    this.subscriptions.push(sbCreate);
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }

  monthly_permitType($event): void {
    this.isShown = $event && $event.target && $event.target.checked;
    this.saveUsername = $event && $event.target && $event.target.checked;
  }

  hour_permitType($event) {
    this.hourshown = $event && $event.target && $event.target.checked;
  }

  hourly_permitType($event) {
    this.hourlyshown = $event && $event.target && $event.target.checked;
  }

  allday_permitType($event) {
    this.alldayshown = $event && $event.target && $event.target.checked;
  }

  overnight_permitType($event) {
    this.overnightshown = $event && $event.target && $event.target.checked;
  }

  taxamountType(e) {
    this.showtaxable = e.target.value;
    this.taxable_checked = e.target.value;
  }

  ngOnDestroy() {
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

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  /* Lot no already exists */
  checkLotno(lotno) {
    if (lotno != '') {
      this.http.get('http://swiftpark.sdiphp.com/api/uniquelotno?lotno=' + lotno).subscribe((data: any) => {
        //this.formGroup.controls['lot_no'].setErrors({ 'incorrect': true });

        if (data == 'true') {
          this.ExistLOTNOError = data;
        } else {
          this.ExistLOTNOError = false;
        }
      });
    }
  }

  downloadFile(url,fileName='test'){
    let link = document.createElement("a");
    link.download = "filename";
    link.href = url;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

   

}

}
