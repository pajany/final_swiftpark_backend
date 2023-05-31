import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourtesyCardService } from '../../e-commerce/_services';
import { ProductsService } from '../../e-commerce/_services';
import { CustomerCourtesyCardService } from '../../e-commerce/_services';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customercourtesy-cards',
  templateUrl: './customercourtesy-cards.component.html',
  styleUrls: ['./customercourtesy-cards.component.scss']
})
export class CustomercourtesyCardsComponent implements OnInit {

  API_URL = `${environment.apiUrl}/`;
  courtesycardno: any = [];
  
  CourtestCardList: {};
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  formGroup: FormGroup;
  lot_no:any;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  ExistLOTNOError: any; 
   
  constructor(
    private fb: FormBuilder,
     public courtesycardservice: CourtesyCardService,
     public customercourtesycardService: CustomerCourtesyCardService,
     public productsService: ProductsService,
     private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.customercourtesycardService.fetch();
   // this.productsService.fetch();
   
    this.filterForm();
    this.searchForm();
    this.getDefaultcardDetails();
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
    this.courtesycardservice.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
      
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
      
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {

    this.courtesycardservice.patchState({ searchTerm });
  }

  

  getcardDetails(event){

    const cardno = event.target.value;
   
    var $HTMLData='';
    if (cardno != "") {
      this.http.get(this.API_URL+'courtesycardtrans?cardno=' + cardno).subscribe((data: any) => {

        $("#CourtesyTable").empty();
        $HTMLData ='<html>';
        $HTMLData+='<body>';
        console.log("current data", data);
        if(data.success =='No Result found'){
          $HTMLData +='<tr>';
          $HTMLData +='<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
          $HTMLData +='</tr>';
        }
        if (data.success  !='No Result found') {

        $HTMLData +='<table class="table" style="width:90%;">';
        $HTMLData +='<thead class="thead-light">';
        $HTMLData +='<tr>';
        $HTMLData +='<th scope="col">Lot No</th>';
        $HTMLData +='<th scope="col">Permit Type</th>';
        $HTMLData +='<th scope="col">Permit No</th>';
        $HTMLData +='<th scope="col">Tax Amount</th>';
        $HTMLData +='<th scope="col">Total Amount</th>';
        $HTMLData +='<th scope="col">Expires Date</th>';
        $HTMLData +='<th scope="col">Transaction Date </th>';
        $HTMLData +='</tr>';
        $HTMLData +='</thead>';
        $HTMLData +='<tbody>';

        if (data) {

          for(var i=0;i<data.length;i++){
            
                $HTMLData +='<tr>';
                $HTMLData +='<td>'+data[i].lot_no+'</td>';
                $HTMLData +='<td>'+data[i].permit_type+'</td>';
                $HTMLData +='<td>'+data[i].permit_no+'</td>';
                $HTMLData +='<td> $'+data[i].taxamount+'</td>'; 
                $HTMLData +='<td> $'+data[i].totalamount +'</td>';
                $HTMLData +='<td>'+data[i].expires_date+'</td>';
                $HTMLData +='<td>'+data[i].created_at+'</td>';
                $HTMLData +='</tr>';
          }
           
      }
   
 
        $HTMLData +='</tbody>';
        $HTMLData +='</table>';
        $HTMLData +='</br>';
        }
        $HTMLData+='</body>';
        $HTMLData+='</html>';

      if(data){
        $("#CourtesyTable").append($HTMLData);
        $(".lotdata").show();
      }else{
        $(".lotdata").hide();
      }
       
      });
    }
  }

  getDefaultcardDetails(){

    const lotno =  localStorage.getItem('currentlotno');;
   
    var $HTMLData='';
    if (lotno != "") {
      this.http.get(this.API_URL+'defaultcustomercourtesy?cust_lot_no=' + lotno).subscribe((data: any) => {

        $("#CourtesyTable").empty();
        $HTMLData ='<html>';
        $HTMLData+='<body>';
        console.log("current data", data);
        if(data.success =='No Result found'){
          $HTMLData +='<tr>';
          $HTMLData +='<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
          $HTMLData +='</tr>';
        }
        if (data.success  !='No Result found') {

        $HTMLData +='<table class="table" style="width:90%;">';
        $HTMLData +='<thead class="thead-light">';
        $HTMLData +='<tr>';
        $HTMLData +='<th scope="col">Lot No</th>';
        $HTMLData +='<th scope="col">Permit Type</th>';
        $HTMLData +='<th scope="col">Permit No</th>';
        $HTMLData +='<th scope="col">Tax Amount</th>';
        $HTMLData +='<th scope="col">Total Amount</th>';
        $HTMLData +='<th scope="col">Expires Date</th>';
        $HTMLData +='<th scope="col">Transaction Date </th>';
        $HTMLData +='</tr>';
        $HTMLData +='</thead>';
        $HTMLData +='<tbody>';

        if (data) {

          for(var i=0;i<data.length;i++){
            
                $HTMLData +='<tr>';
                $HTMLData +='<td>'+data[i].lot_no+'</td>';
                $HTMLData +='<td>'+data[i].permit_type+'</td>';
                $HTMLData +='<td>'+data[i].permit_no+'</td>';
                $HTMLData +='<td> $'+data[i].taxamount+'</td>'; 
                $HTMLData +='<td> $'+data[i].totalamount +'</td>';
                $HTMLData +='<td>'+data[i].expires_date+'</td>';
                $HTMLData +='<td>'+data[i].created_at+'</td>';
                $HTMLData +='</tr>';
          }
           
      }
   
 
        $HTMLData +='</tbody>';
        $HTMLData +='</table>';
        $HTMLData +='</br>';
        }
        $HTMLData+='</body>';
        $HTMLData+='</html>';

      if(data){
        $("#CourtesyTable").append($HTMLData);
        $(".lotdata").show();
      }else{
        $(".lotdata").hide();
      }
       
      });
    }
  }
}
