// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../_services';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit{
 
  API_URL = `${environment.apiUrl}/`;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  ExistLOTNOError: any; 
   
  constructor(
    private fb: FormBuilder,
     public productsService: ProductsService,
     private http: HttpClient,
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.productsService.fetch();
    const sb = this.productsService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb); 
    this.productsService.fetch();

   
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
    this.productsService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      invoice_no: [''],
    });
  
  }

  search(searchTerm: string) {

    this.productsService.patchState({ searchTerm });
  }

  save(){

    const formData = this.searchGroup.value;
    const invoice_no = formData.invoice_no;

     var $HTMLData='';
    if (invoice_no != "") {
      this.http.get(this.API_URL+'invoicedata?invoice_no=' + invoice_no).subscribe((data: any) => {

        console.log("return res",data.cheque);
        
        $("#lotTable").empty();
        $HTMLData ='<html>';
        $HTMLData+='<body>';

        if(data.success =='No Result found'){
          $HTMLData +='<table class="table" style="margin-top: 60px;">';
          $HTMLData +='<tbody>';
          $HTMLData +='<tr>';
          $HTMLData +='<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
          $HTMLData +='</tr>';
          $HTMLData +='</tbody>';
          $HTMLData +='</table>';
        }

    if(data.success  !='No Result found') {

        $HTMLData +='<table class="table" style="width:92%;margin-top: 60px;">';
        $HTMLData +='<thead class="thead-light">';
        $HTMLData +='<tr>';
        $HTMLData +='<th scope="col">Client‎</th>';
        $HTMLData +='<th scope="col">Invoice No‎‎</th>';
        $HTMLData +='<th scope="col">Cheque‎/‎Ref No</th>';
        $HTMLData +='<th scope="col">Amount‎</th>';
        $HTMLData +='<th scope="col">Date‎</th>';
        $HTMLData +='<th scope="col">Paid / ‎Received‎</th>';
        $HTMLData +='</tr>';
        $HTMLData +='</thead>';
        $HTMLData +='<tbody>';

        $HTMLData +='<tr>';
        $HTMLData +='<td>'+data.client+'</td>';
        $HTMLData +='<td>'+data.invoice_no+'</td>';
        $HTMLData +='<td>'+data.cheque+'</td>'; 
        $HTMLData +='<td>'+data.amount+'</td>';
        $HTMLData +='<td>'+data.paid_date+'</td>'; 
        $HTMLData +='<td>'+data.paid_status+'</td>';
         $HTMLData +='</tr>';
 
        $HTMLData +='</tbody>';
        $HTMLData +='</table>';
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

  allRecords(){

    var $HTMLData='';
    this.http.get(this.API_URL+'allinvoicedata').subscribe((data: any) => {

      console.log("return res",data);
      
      $("#lotTable").empty();
      $HTMLData ='<html>';
      $HTMLData+='<body>';

      if(data.success =='No Result found'){
        $HTMLData +='<tr style="text-align:center;">';
        $HTMLData +='<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
        $HTMLData +='</tr>';
      }

  if(data.success  !='No Result found') {

      $HTMLData +='<table class="table" style="width:92%;margin-top: 60px;">';
      $HTMLData +='<thead class="thead-light">';
      $HTMLData +='<tr>';
      $HTMLData +='<th scope="col">Client‎</th>';
      $HTMLData +='<th scope="col">Invoice No‎‎</th>';
      $HTMLData +='<th scope="col">Cheque‎/‎Ref No</th>';
      $HTMLData +='<th scope="col">Amount‎</th>';
      $HTMLData +='<th scope="col">Date‎</th>';
      $HTMLData +='<th scope="col">Paid / ‎Received‎</th>';
      $HTMLData +='</tr>';
      $HTMLData +='</thead>';
      $HTMLData +='<tbody>';
      for(var i=0;i<data.length;i++){
      $HTMLData +='<tr>';
      $HTMLData +='<td>'+data[i].client+'</td>';
      $HTMLData +='<td>'+data[i].invoice_no+'</td>';
      $HTMLData +='<td>'+data[i].cheque+'</td>'; 
      $HTMLData +='<td>'+data[i].amount+'</td>';
      $HTMLData +='<td>'+data[i].paid_date+'</td>'; 
      $HTMLData +='<td>'+data[i].paid_status+'</td>';
      $HTMLData +='</tr>';
      }

      $HTMLData +='</tbody>';
      $HTMLData +='</table>';
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

 