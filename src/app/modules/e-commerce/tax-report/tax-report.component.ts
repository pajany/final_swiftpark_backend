// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal,NgbDate,NgbModule,NgbCalendar, NgbDateAdapter, NgbDateParserFormatter,NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsService } from '../_services';
import { CustomAdapter , CustomDateParserFormatter, getDateFromString} from 'src/app/_metronic/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tax-report',
  templateUrl: './tax-report.component.html',
  styleUrls: ['./tax-report.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class TaxReportComponent implements OnInit{
  
  API_URL = `${environment.apiUrl}/`;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  
  private subscriptions: Subscription[] = []; 
  lot_no:'';
  fromdate:undefined;
  todate:undefined;
 
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
    $(".lotdata").hide();
   
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
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

  
  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      lot_no: [''],
      condition: [''],
      searchTerm: [''],
    });
    
  
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
    console.log("RRRRRRRRR",this.searchGroup);
  }

  search(searchTerm: string) {
    this.productsService.patchState({ searchTerm });
  }

  save() {
    const formData = this.searchGroup.value;

    console.log("All Res", formData);
    console.log("fromdate", formData.fromdate);
    console.log("todate", formData.todate);
    console.log("lot_no", formData.lot_no);

    console.log("this FFF", this.fromDate);
    console.log("this Tooo", this.toDate);

  const fromdate = formData.fromdate;
  const todate = formData.todate;
  const lotno = formData.lot_no;

  var $HTMLData='';
  if (lotno != "") {
    this.http.get(this.API_URL+'accountsummary?lotno='+lotno+'&fromdate='+fromdate+'&todate='+todate).subscribe((data: any) => {

      console.log("All data", data);
      $("#lotTable").empty();
      $HTMLData ='<html>';
      $HTMLData+='<body>';

      if (data.success  !='No Result found') {

      $HTMLData+='<div style="margin-top: 40px;">   <h5 >SwiftPark</h5>';
      $HTMLData+='<span class="d-flex flex-column  addr opacity-70">';
      
      if(data.address !=null || data.state!=null){
        $HTMLData+='<span>'+data.address+','+data.state+'</span>';
      }else{
        $HTMLData+='<span>'+' '+'</span>';
      }
      
      if(data.tel !=null){
        $HTMLData+='<span>Tel: '+data.tel+'</span>';
      }else{
        $HTMLData+='<span>Tel: '+' '+'</span>';
      }

      if(data.fax !=null){
        $HTMLData+='<span>Fax: '+data.fax+'</span>';
      }else{
        $HTMLData+='<span>Fax: '+' '+'</span>';
      }
      if(data.email !=null){
        $HTMLData+='<span>Email: '+data.email+'</span>';
      }else{
        $HTMLData+='<span>Email: '+' '+'</span>';
      }
      $HTMLData+='</span>';
      $HTMLData+='  </div>';

      $HTMLData+=' <hr style="width:95%;text-align:left;margin-left:-10px">';
      $HTMLData+='  <div class="row">'; 
      $HTMLData+='  <label class="col-lg-6 d-flex flex-column "> Today‎Date‎ :'+ data.search_period_from+'</label>' ;
      $HTMLData+='  <label class="col-lg-6 "> Report Period‎ :'+data.search_period_from+' to '+data.search_period_to+'</label>' ;
      $HTMLData+='  </div>';

      }
      $HTMLData +='<table class="table" style="width:90%; margin-top: 40px;">';
      $HTMLData +='<thead class="thead-light">';
      $HTMLData +='<tr>';
      $HTMLData +='<th scope="col">Date‎</th>';
      $HTMLData +='<th scope="col">Invoice ‎#‎ </th>';
      $HTMLData +='<th scope="col">Lot ‎#‎‎</th>';
      $HTMLData +='<th scope="col">Tax Collected‎‎</th>';
      $HTMLData +='<th scope="col">Tax Payed Out‎ ‎‎</th>';
      $HTMLData +='<th scope="col">Tax Payable‎‎‎</th>';
      $HTMLData +='</tr>';
      $HTMLData +='</thead>';
      $HTMLData +='<tbody>';
 
      if(data.success =='No Result found'){
       
        $HTMLData+=' <table class="table"><body>';
        $HTMLData +='<tr>';
        $HTMLData +='<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
        $HTMLData +='</tr>';
        $HTMLData+='</body></table>';
      }

    if (data.success !='No Result found'){

      $HTMLData +='<tr>';
      $HTMLData +='<td>'+data.created+'</td>';
      $HTMLData +='<td>'+1251 +'</td>';
      $HTMLData +='<td>'+data.lot_no+'</td>';
      $HTMLData +='<td>$0.00</td>';
      $HTMLData +='<td>$0.00</td>';
      $HTMLData +='<td>$0.00</td>';
      $HTMLData +='</tr>';
    }
      $HTMLData +='</tbody>';
      $HTMLData +='</table>';
      $HTMLData+='</body>';
      $HTMLData+='</html>';

    if(data){
      $("#lotTable").append($HTMLData);
      $(".lotdata").show();
    }else{
      $(".lotdata").hide();
    }
     
    });
  }
}

  }

 