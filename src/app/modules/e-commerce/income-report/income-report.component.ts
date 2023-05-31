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
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class IncomeReportComponent implements OnInit{
  
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
    this.productsService.fetch();
    const sb = this.productsService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb); 
    this.productsService.fetch();
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
      condition: [''],
      searchTerm: [''],
    });
    
  
  }


  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      fromdate: [''],
      todate: [''],
    });
  }

  search(searchTerm: string) {
    this.productsService.patchState({ searchTerm });
  }

  save() {
    const formData = this.searchGroup.value;

    console.log("fromdate", formData.fromdate);
    console.log("todate", formData.todate);
 
    

  const fromdate = formData.fromdate;
  const todate = formData.todate;
 
  var $HTMLData='';
  if (fromdate != "" && todate!="") {

    this.http.get(this.API_URL+'incometaxreport?fromdate='+fromdate+'&todate='+todate).subscribe((data: any) => {

      console.log("All data", data);

      $("#lotTable").empty();
      $HTMLData ='<html>';
      $HTMLData+='<body>';

      $HTMLData +='<table class="table" style="width:90%; margin-top: 40px;">';
      $HTMLData +='<thead class="hi" style="background-color: #5dab14;">';
      $HTMLData +='<tr>';
      $HTMLData +='<th scope="col">Month‎-‎wise Lot Details‎</th>';
      $HTMLData +='<th scope="col">Total Permit </th>';
      $HTMLData +='<th scope="col">TAX‎‎</th>';
      $HTMLData +='<th scope="col">Swift Park ‎Charge‎‎‎</th>';
      $HTMLData +='<th scope="col">Tax ‎‎</th>';
      $HTMLData +='<th scope="col">Card ‎Transaction ‎‎‎</th>';
      $HTMLData +='<th scope="col">Tax ‎‎</th>';
      $HTMLData +='<th scope="col">Total ‎‎</th>';
      $HTMLData +='</tr>';
      $HTMLData +='</thead>';
      $HTMLData +='<tbody>';
 
   
      $HTMLData +='</tbody>';
      $HTMLData +='</table>';
      if(data.success =='No Result found'){
       
        $HTMLData +='<tr>';
        $HTMLData +='<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
        $HTMLData +='</tr>';
      }

      if (data.success !='No Result found'){

      for(var i=0;i<data.length;i++){

      $HTMLData+='<div class="form-group row">';
      $HTMLData+='  <label class="col-lg-2 "> Lot NO: </label>';
      $HTMLData+=' <div class="col-lg-10">';
      $HTMLData+=''+data[i].lot_no +'';
      $HTMLData+='</div>';

      $HTMLData+='<label class="col-lg-2  ">  Lot Name:  </label>';
      $HTMLData+=' <div class="col-lg-10">';
      $HTMLData+=''+data[i].client_name +'';
      $HTMLData+='</div>';
      
      $HTMLData+='  <label class="col-lg-2 "> Lot Address:  </label>';
      $HTMLData+=' <div class="col-lg-10">';
      $HTMLData+=''+data[i].address +'';
      $HTMLData+='</div>';
      $HTMLData+=' </div>';

      $HTMLData +='<table class="table" style="width:90%; margin-top: 4px; margin-left: -10px;border: 2px solid #5dab14; border-collapse: collapse;">';
      $HTMLData+='<tr>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 17%;">SwiftPark Card</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;"> </td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;">  </td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;">  </td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;">  </td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 10%;">0.00</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 7%;">0.00</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 7%;">0.00</td>';
      $HTMLData+='</tr>';
      $HTMLData+='</table>';

      $HTMLData +='<table class="table" style="width:90%; margin-top: 4px; margin-left: -10px;border: 2px solid #5dab14; border-collapse: collapse;">';
      $HTMLData+='<tr>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 17%;">Credit Card /Interac</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 15%;">Maria Anders</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 15%;"></td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;">'+data[i].permits_sold+'</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 15%;"></td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 10%;">'+data[1].courtesy_charge+'s</td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 7%;"></td>';
      $HTMLData+='<td style="border: 2px solid #5dab14; border-collapse: collapse;width: 7%;"></td>';
      $HTMLData+='</tr>';
      $HTMLData+='</table>';

 }
}
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

 