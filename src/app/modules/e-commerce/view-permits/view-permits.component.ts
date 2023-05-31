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
  selector: 'app-view-permits',
  templateUrl: './view-permits.component.html',
  styleUrls: ['./view-permits.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})

export class ViewPermitsComponent implements OnInit{
  
  API_URL = `${environment.apiUrl}/`;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  
  private subscriptions: Subscription[] = []; 
  lot_no:'';
  permit_no:'';
  plate_no:'';
  permit_exp: '';
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

  getselectedDetails(e){
    $("#lotTable").empty();
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
      permit_no: [''],
      plate_no: [''],
      permit_exp: [''],
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
      permit_no: [''],
      plate_no: [''],
      permit_exp: [''],
      fromdate: [''],
      todate: [''],
    });
  }

  search(searchTerm: string) {
    this.productsService.patchState({ searchTerm });
  }

  save() {
    const formData = this.searchGroup.value;
    console.log("Resonse", formData);
    const lotno = formData.lot_no;
    const fromdate = formData.fromdate;
    const todate = formData.todate;
    const permitno = formData.permit_no;
    const plateno = formData.plate_no;
    const permitexp = formData.permit_exp;
 
  var $HTMLData='';
  if (lotno != "") {

    this.http.get(this.API_URL+'viewpermit?lotno='+lotno+'&fromdate='+fromdate+'&todate='+todate+'&permitno='+permitno+'&plateno='+plateno+'&permitexp='+permitexp).subscribe((data: any) => {
 
      $("#lotTable").empty();
      $HTMLData ='<html>';
      $HTMLData+='<body>';
    
      $HTMLData +='<table class="table" style="width:90%; margin-top: 40px;">';
      $HTMLData +='<thead class="hi" style="background-color: #5dab14;">';
      $HTMLData +='<tr>';
      $HTMLData +='<th scope="col">Permit No</th>';
      $HTMLData +='<th scope="col">Permit Type</th>';
      $HTMLData +='<th scope="col">Payment Type</th>';
      $HTMLData +='<th scope="col">Plate No</th>';
      $HTMLData +='<th scope="col">Transaction Date </th>';
      $HTMLData +='<th scope="col">Expiry Date & Time </th>';
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
      
if (data) {
 
    for(var i=0;i<data.length;i++){
      
          $HTMLData +='<tr style="color:'+data[i].color +'">';
          $HTMLData +='<td>'+data[i].permit_no+'</td>';
          $HTMLData +='<td>'+data[i].permit_type +'</td>';

          if(data[i].created_by =='Admin' && data[i].created_by !=null){
            $HTMLData +='<td>'+'Admin'+'</td>';
          }else if(data[i].created_by =='Client'){
            $HTMLData +='<td>'+'Client'+'</td>';
          }else{

              if(data[i].payment_type =='credit card'){
                $HTMLData +='<td>'+'credit card'+'</td>'; 
              }else{
                console.log("===========",data[i].courtesy_number);
                if(data[i].courtesy_number !='NULL'){
                  $HTMLData +='<td>'+'SC'+data[i].courtesy_number+'</td>'; 
                }else{
                  $HTMLData +='<td>'+' '+'</td>'; 
                }
              }
          }
          
            
          $HTMLData +='<td>'+data[i].plate_no+'</td>';
          $HTMLData +='<td>'+ data[i].transaction_date +'</td>';
          $HTMLData +='<td>'+ data[i].expires_date+'</td>';
          $HTMLData +='</tr>';
    }
     
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

 