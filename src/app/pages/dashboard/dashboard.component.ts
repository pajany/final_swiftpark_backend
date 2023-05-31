import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dashboardData: any = [];
  key: any;
  constructor(public dashboardService: DashboardService, private spinner: NgxSpinnerService) {}
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spinner.show();
    this.dashboardService.getDashboardData().subscribe((data: any) => {
      this.dashboardData = data.response;
      console.log(this.dashboardData);
      this.spinner.hide();
      this.triggerFalseClick();
    });
  }

  manualClick(): void {
    // this.spinner.show();
    this.dashboardService.getDashboardData().subscribe((data: any) => {
      this.dashboardData = data.response;
      console.log(this.dashboardData);
      //   this.spinner.hide();
      //  this.triggerFalseClick();
    });
  }
}
