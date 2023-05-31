import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.scss']
})
export class AccountsummaryComponent implements OnInit {

  API_URL = `${environment.apiUrl}/accountsummary`;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  lot_no: '';
  fromdate: undefined;
  todate: undefined;
  summarydata:any;
  getnotno:any;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig
  ) { }

  ngOnInit() {
    console.log("storage",localStorage.getItem("currentlotno"));
    this.getnotno= localStorage.getItem("currentlotno");

    this.http.get(this.API_URL+'?lotno='+this.getnotno).subscribe(data => {
      this.summarydata = data;
      console.log("summarydata", this.summarydata);
     }) ; 
  }



}
