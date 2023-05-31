import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageConfiguration } from 'src/app/modules/auth/storage-setting/storage-configuration';
import { ProductsService } from '../../_services';
import { ErrorModalComponentComponent } from '../editpermiterror/error-modal-component/error-modal-component.component';
import { permitService } from '../manage-permits.services';

@Component({
  selector: 'app-managepermit-edit',
  templateUrl: './managepermit-edit.component.html',
  styleUrls: ['./managepermit-edit.component.scss']
})
export class ManagepermitEditComponent implements OnInit {
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  inputnumber = 0;
  visibleDiv: boolean = false;
  lotNumber: number = 0;
  tableData: any[] = [];
  amount: number = 0;
  taxAmount: number = 0;
  totalAmount: number | undefined = 0;

  lot_no: any;
  permit_type: any = [];
  qty: any = [];

  courtesy_no: number | undefined = 0;
  courtesy_pin: number | undefined = 0;
  percentage:number | undefined = 0;

  model: any = {};
  message: string = '';
  show: boolean = false;
  transactionhistory: any = [];

  address: string = '';
  transactionemail: string = '';
  email: string = '';
  phone: number = 0;
  date: number = Date.now();
  expiryDate: any = null;
  quantity: any = null;
  iscourtesycard: boolean = false;
  submitted: boolean;
  formProcess: boolean;
  token: string;
  isStripeCard: boolean = true;
  errorMessage: any = '';
  isLoading: boolean;
  permittype: any;
  amt: any;
  alphaNumeric = /^[a-z0-9]+$/i;
  //  viewtransForm: FormGroup;
  value: number | undefined = 0;
  Licenseno: any;
  isAdminMenu: boolean = false;
  constructor(
    public permitservice: permitService,
    public productsService: ProductsService,
    public router: ActivatedRoute,
    public route: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private storageConfiguration: StorageConfiguration
  ) {}

  ngOnInit(): void {
    if (!this.isAdminMenu) {
      this.lot_no = parseInt(localStorage.getItem('currentlotno'));
      this.onCheckboxChange(this.lot_no);
    }
    let isloggedIn = this.storageConfiguration.sessionGetItem(this.storageConfiguration.menushow);
    if (isloggedIn === 'true') {
      this.isAdminMenu = true;
    } else {
      this.isAdminMenu = false;
    }
    this.spinner.show();
    this.router.params.subscribe((data: any) => {
      this.lotNumber = parseInt(data.lotNumber);
      this.spinner.hide();
    });
    this.quantity = 1;
    this.productsService.custfetch();
    const sb = this.productsService.isLoading$.subscribe(res => (this.isLoading = res));

    this.router.params.subscribe((data: any) => {
      this.lotNumber = parseInt(data.lotNumber);
      if (!this.isAdminMenu) {
        this.lot_no = parseInt(localStorage.getItem('currentlotno'));
        this.onCheckboxChange(this.lot_no);
      }
    });
    if (!this.isAdminMenu) {
      this.lot_no = localStorage.getItem('currentlotno');
      console.log(this.lot_no);
      this.onCheckboxChange(this.lot_no);
    }
    // this.viewtransForm.get('permit_type').valueChanges.subscribe(val => {
    //   if (val) {
    //     this.amountCalculation();
    //   }
    // });
  }

  keyPressAlphaNumericWithCharacters(event) {
    var inp = String.fromCharCode(event.keyCode);

    // Allow numbers, alpahbets, space, underscore
    if (/[a-z0-9]/.test(inp)) {
      //return true;
      this.Licenseno = '';
      return this.Licenseno;
    } else {
      event.preventDefault();
      this.Licenseno = "don't allow space or dashes";
      return this.Licenseno;
    }
  }

  onCheckboxChange(lotNo) {
    {
      this.spinner.show();
      this.permitservice.lotNumberValidation(lotNo).subscribe(
        (params: any) => {
          console.log("all data",params);
          this.tableData = params.services;
          this.address = params.address;
          this.spinner.hide();
          this.tableData.forEach(x => {
            x.selected = false;
            x.quantity = 1;
            if (x.duration === 30) {
              x.quantity = 1;
            } else {
              x.quantity = '';
            }
          });
          this.taxAmount = Number(params.tax);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  amountCalculation() {
    if (this.permittype) {
      const index = this.tableData.findIndex(y => y.name === this.permittype);
      this.amount = Number(this.tableData[index].amt) * this.permittype;
      this.amt = this.tableData[index].amt;
      this.amount = Number(this.tableData[index].amt) * this.quantity;
      if (this.amount > 0) {
        this.percentage = this.amount* Number(this.taxAmount)/100 ;

        this.totalAmount = this.amount + Number(this.percentage);
        this.expiryDate = new Date();
        if (this.tableData[index].expires) {
          if (this.tableData[index].name.includes('Night')) {
            this.expiryDate.setDate(
              this.expiryDate.getDate() + Number(this.tableData[index].duration) * Number(this.quantity)
            );
          } else {
            let numbeOfDate = Number(this.tableData[index].duration) * Number(this.quantity);
            this.expiryDate.setDate(this.expiryDate.getDate() + numbeOfDate - 1);
          }
          let hours: number = Number(this.tableData[index].expires);
          this.expiryDate.setHours(hours);
          this.expiryDate.setMinutes(0);
          this.expiryDate.setSeconds(0);
        } else {
          if (this.tableData[index].type.includes('Days')) {
            this.expiryDate.setDate(
              this.expiryDate.getDate() + Number(this.tableData[index].duration) * Number(this.quantity)
            );
          } else {
            let hours = Number(this.tableData[index].duration) * Number(this.quantity);
            this.expiryDate.setHours(this.expiryDate.getHours() + hours);
          }
        }
      } else {
        this.totalAmount = 0;
        this.percentage = 0;
      }
    }
  }

  transactionSubmit() {}

  onSubmit() {
    this.spinner.show();
    let params: any = {};
    params.permit_type = this.permittype;
    params.quantity = this.quantity;
    params.selectedAmount = this.amt;
    (params.lot_number = this.lot_no),
      (params.subtotal = this.amount),
      (params.taxamount = this.percentage),
      (params.email = this.model.email),
      (params.phone = this.model.phone),
      (params.totalamount = this.totalAmount),
      (params.expires_date = this.expiryDate),
      (params.license = this.model.license),
      (params.courtesy_number = this.model.courtesyCard),
      (params.pin = this.model.pin),
      (params.iscourtesycard = true);
    if (!this.isAdminMenu) {
      params.createdby = 'Client';
    } else {
      params.createdby = 'Admin';
    }

    params.token = this.token;

    this.permitservice.submitForm(params).subscribe(
      (data: any) => {
        this.spinner.hide();
        if (!data.status) {
          setTimeout(() => {}, 200);
          if (this.isAdminMenu) {
            this.route.navigate(['/superadmin/managepermit']);
          } else {
            this.route.navigate(['/customer/viewpermits']);
          }
        } else {
        }
      },
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.message = error.error.message;
        this.showError(this.message);
      }
    );
  }
  showError(message) {
    this.message = message;
    const modalRef = this.modalService.open(ErrorModalComponentComponent, { size: 'xl' });
    modalRef.componentInstance.message = this.message;
  }
  handleKeydown(e: any) {
    const typedValue = e.keyCode;
    if (typedValue < 48 && typedValue > 57) {
      // If the value is not a number, we skip the min/max comparison
      return;
    }

    const typedNumber = parseInt(e.key);
    const min = parseInt(e.target.min);
    const max = parseInt(e.target.max);
    const currentVal = parseInt(e.target.value) || '';
    const newVal = parseInt(typedNumber.toString() + currentVal.toString());

    if (newVal < min || newVal > max) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
