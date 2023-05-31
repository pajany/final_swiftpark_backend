// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbDate, NgbModule, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsService } from '../_services';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from 'src/app/_metronic/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})

export class AccountSummaryComponent implements OnInit {

  API_URL = `${environment.apiUrl}/`;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  lot_no: '';
  fromdate: undefined;
  todate: undefined;


  constructor(
    private fb: FormBuilder,
    public productsService: ProductsService,
    private http: HttpClient,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig
  ) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.productsService.custfetch();
    const sb = this.productsService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
    this.productsService.custfetch();


  }


  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      lot_no: [''],
      condition: [''],
      searchTerm: [''],
    });


  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


  filter() {
    const filter = {};
    const lot_no = this.filterGroup.get('lot_no').value;
    if (lot_no) {
      filter['lot_no'] = lot_no;
    }

    const condition = this.filterGroup.get('condition').value;
    if (condition) {
      filter['condition'] = condition;
    }
    this.productsService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      lot_no: [''],
      fromdate: [''],
      todate: [''],
    });
  }

  search(searchTerm: string) {
    this.productsService.patchState({ searchTerm });
  }

  save() {
    const formData = this.searchGroup.value;
    const fromdate = formData.fromdate;
    const todate = formData.todate;
    const lotno = formData.lot_no;
    var $HTMLData = '';
    if (lotno != "") {
      this.http.get(this.API_URL + 'accountsummary?lotno=' + lotno + '&fromdate=' + fromdate + '&todate=' + todate).subscribe((data: any) => {

        $("#lotTable").empty();
        $HTMLData = '<html>';
        $HTMLData += '<body>';
    
        if (data.success == 'No Result found') {
          $HTMLData += ' <table class="table"><body>';
          $HTMLData += '<tr>';
          $HTMLData += '<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
          $HTMLData += '</tr>';
          $HTMLData += '</body></table>';

        }

        if (data.success != 'No Result found') {

          $HTMLData += '<div class="d-flex flex-column-fluid"><div class="container"> <div class=" overflow-hidden">';
          $HTMLData += '<div class="card-body p-0"> <div class="row  py-8 px-8 py-md-27 px-md-0"> <div class="col-md-10">';
          $HTMLData += '<div class="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row"><h1 class="display-4 font-weight-boldest mb-10">INVOICE</h1>';
          $HTMLData += '<div class="d-flex flex-column align-items-md-start px-0">   <h3 class="display-4 font-weight-boldest mb-10">SwiftPark</h3>';
          $HTMLData += '<span class="d-flex flex-column align-items-md-start opacity-70">';
          $HTMLData += '<span>' + data[0].address + ',' + data[0].state + '</span>';
          $HTMLData += '<span>Tel‎: ' + data[0].tel + '</span>';
          $HTMLData += '<span>Fax: ‎' + data[0].fax + '</span>';
          $HTMLData += '<span>Email: ' + data[0].email + '</span>';

          $HTMLData += '</span>';
          $HTMLData += '</div>  </div>';

          $HTMLData += '<div class="border-bottom w-100"></div>';
          $HTMLData += ' <div class="d-flex justify-content-between pt-6"><div class="d-flex flex-column flex-root">';
          $HTMLData += ' <span class="font-weight-bolder mb-2">Permit  Sales  before  taxes‎</span>';
          $HTMLData += '<span class="opacity-70">$ 0</span></div>';
          $HTMLData += ' <div class="d-flex flex-column flex-root">';
          $HTMLData += ' <span class="font-weight-bolder mb-2">LOT NO.</span> <span class="opacity-70">' + data[0].lot_no + '</span> </div>';
          $HTMLData += '  <div class="d-flex flex-column flex-root">';
          $HTMLData += ' <span class="font-weight-bolder mb-2">INVOICE NO</span> <span class="opacity-70"> 4321</span>';
          $HTMLData += ' </div> </div> ';

          $HTMLData += ' <div class="d-flex justify-content-between pt-6"><div class="d-flex flex-column flex-root">';
          $HTMLData += ' <span class="font-weight-bolder mb-2">INVOICE DATE</span>';
          $HTMLData += '<span class="opacity-70">' + data.invoice_date + '</span></div>';
          $HTMLData += ' <div class="d-flex flex-column flex-root">';
          
          $HTMLData += ' <span class="font-weight-bolder mb-2">BILLING PERIOD</span> <span class="opacity-70">' + data.search_period_from + ' to ' + data.search_period_to + '</span> </div>';
          
          $HTMLData += '  <div class="d-flex flex-column flex-root">';
          $HTMLData += ' <span class="font-weight-bolder mb-2">BILL TO.</span> <span class="opacity-70">Nemesis Security Services Inc. <br />123 SWIFTPARK AVENUE</span>';
          $HTMLData += ' </div> </div> ';

          $HTMLData += ' </div> </div>';
          $HTMLData += '  <div class="row   py-8 px-8 py-md-10 px-md-0"><div class="col-md-11"><div class="table-responsive">';
          $HTMLData += '  <table class="table"><thead><tr>';
          $HTMLData += '<th class="pl-0 font-weight-bold text-muted text-uppercase">Description</th>';
          $HTMLData += '<th class="text-center font-weight-bold text-muted text-uppercase">No of ‎Transactions‎</th> ';
          $HTMLData += '<th class="text-center font-weight-bold text-muted text-uppercase">Qty </th>';
          $HTMLData += '<th class="text-center pr-0 font-weight-bold text-muted text-uppercase">Amount</th>';
          $HTMLData += '<th class="text-center pr-0 font-weight-bold text-muted text-uppercase">Tax‎</th>';
          $HTMLData += '<th class="text-center pr-0 font-weight-bold text-muted text-uppercase">Total‎</th>';
          $HTMLData += ' </tr> </thead> <tbody> <tr class="font-weight-boldest">';
          $HTMLData += '<td class="pl-0 pt-7">SwiftPark Courtesy Card Transactions</td> ';
         
          if(data.cardtype_courtesy =='courtesy card'){

            $HTMLData += '<td class="text-center pt-7">'+ data.trans_courtesy +'</td>';
            $HTMLData += ' <td class="text-center pt-7">'+ data.sumquty_courtesy +'</td>';
            $HTMLData += '<td class="text-center pr-0 pt-7 text-center">$'+ data.subtotalamount_courtesy +'</td> ';
            $HTMLData += '<td class="text-center pr-0 pt-7 text-center">$'+ data.tax_courtesy +'</td> ';
            $HTMLData += '<td class="text-center pr-0 pt-7 text-center">$'+ data.total_courtesy +'</td> </tr> ';
          }


          $HTMLData += '  <tr class="font-weight-boldest border-bottom-0"><td class="border-top-0 pl-0 py-4">Credit Card Transactions</td>';
        if(data.cardtype_credit =='credit card'){

          $HTMLData += ' <td class="border-top-0 text-center py-4">'+ data.trans_credit +'</td>';
          $HTMLData += '<td class="border-top-0 text-center py-4">'+ data.sumquty_credit +'</td>';
          $HTMLData += ' <td class="text-center border-top-0 pr-0 py-4 text-center">$'+ data.subtotalamount_credit +'</td> ';
          $HTMLData += ' <td class="text-center border-top-0 pr-0 py-4 text-center">$'+ data.tax_credit +'</td> ';
          $HTMLData += ' <td class="text-center border-top-0 pr-0 py-4 text-center">$'+ data.total_credit +'</td> </tr>';
        }

          $HTMLData += ' <tr class="font-weight-boldest border-bottom-0"><td class="border-top-0 pl-0 py-4">Sub Totals  </td>';
          $HTMLData += '<td class="border-top-0 text-center py-4"> </td> <td class="border-top-0 text-center py-4"> </td>';
          $HTMLData += '<td class="text-center border-top-0 pr-0 py-4 text-center">$'+data.sub_total_amo+'</td> ';
          $HTMLData += '<td class="text-center border-top-0 pr-0 py-4 text-center">$'+data.sub_total_tax+'</td> ';
          $HTMLData += '<td class="text-center border-top-0 pr-0 py-4 text-center">$'+data.sub_total_all+'</td> </tr>';
          
          $HTMLData += ' <tr class="font-weight-boldest border-bottom-0"><td class="border-top-0 pl-0 py-4">SwiftPark share of Permit sales </td>';
          $HTMLData += '<td class="border-top-0 text-center py-4"> </td> <td class="border-top-0 text-center py-4"> </td>';
          $HTMLData += '<td class="text-center border-top-0 pr-0 py-4 text-center">$00.00</td> ';
          $HTMLData += '<td class="text-center border-top-0 pr-0 py-4 text-center">$00.00</td> ';
          $HTMLData += '<td class="text-center border-top-0 pr-0 py-4 text-center">$'+data.swift_share_amo +'</td> </tr>';

          $HTMLData += ' <tr class=" text-danger font-weight-boldest border-bottom-0"><td class="border-top-0 pl-0 py-4">Client share of Permit sales </td>';
          $HTMLData += '<td class="border-top-0 text-center py-4"> </td> <td class="border-top-0 text-center py-4"> </td>';
          $HTMLData += '<td class="text-danger border-top-0 pr-0 py-4 text-center">$00.00</td> ';
          $HTMLData += '<td class="text-danger border-top-0 pr-0 py-4 text-center">$00.00</td> ';
          $HTMLData += '<td class="text-danger border-top-0 pr-0 py-4 text-center">$'+data.swift_client_share_amo +'</td> </tr>';

          $HTMLData += '</tbody> </table></div></div></div>';


          $HTMLData += ' <div class="row  py-8 px-8 py-md-10 px-md-0"> <div class="col-md-11">';
          $HTMLData += ' <div class="table-responsive"> ';
          $HTMLData += '<h3>AMOUNT PAYABLE TO Client</h3>';
          $HTMLData += '<h4>$'+data.swift_client_share_amo +' DUE  UPON  RECEIPT</h4>';
          $HTMLData += '</div></div></div>';
        }

        $HTMLData += ' </div> </div> </div> </div>';
        $HTMLData += '</body>';
        $HTMLData += '</html>';

        if (data) {
          $("#lotTable").append($HTMLData);
          $(".lotdata").show();
        } else {
          $(".lotdata").hide();
        }

      });
    }
  }


}

