import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerCourtesyCardService } from '../../e-commerce/_services';

import {
  GroupingState,
  PaginatorState,
  SortState,
  ICreateAction,
  IEditAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_metronic/shared/crud-table';
import { CustCourtesycardsEditComponent } from './components/cust-courtesycards-edit/cust-courtesycards-edit.component';
 
@Component({
  selector: 'app-cust-courtesycards',
  templateUrl: './cust-courtesycards.component.html',
  styleUrls: ['./cust-courtesycards.component.scss']
})
export class CustCourtesycardsComponent  
implements
  OnInit,
  OnDestroy,
  ICreateAction,
  IEditAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  IFilterView {
    
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  totalrec: any;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public custcourtesycardService: CustomerCourtesyCardService
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.custcourtesycardService.fetch();
    this.totalrec= this.custcourtesycardService.fetch();
    this.grouping = this.custcourtesycardService.grouping;
    this.paginator = this.custcourtesycardService.paginator;
    this.sorting = this.custcourtesycardService.sorting;
    const sb = this.custcourtesycardService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.status.valueChanges.subscribe(() =>
        this.filter()
      )
    );
    this.subscriptions.push(
      this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get('status').value;
    if (status) {
      filter['status'] = status;
    }

    const type = this.filterGroup.get('type').value;
    if (type) {
      filter['type'] = type;
    }
    this.custcourtesycardService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.custcourtesycardService.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.custcourtesycardService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.custcourtesycardService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(CustCourtesycardsEditComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.custcourtesycardService.fetch(),
      () => { }
    );
  }

  
  download(data){
    
    let jsondata =JSON.parse(JSON.stringify(data.source.value));
    console.log("export data",jsondata);
     this.downloadFile(jsondata, 'Customer Courtesycard');
   }
 
   downloadFile(data, filename='data') {
 
     let csvData = this.ConvertToCSV(data, ['calls','card_no','card_pin','card_type']);
     
     let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
     let dwldLink = document.createElement("a");
     let url = URL.createObjectURL(blob);
     let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
     if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
         dwldLink.setAttribute("target", "_blank");
     }
     dwldLink.setAttribute("href", url);
     dwldLink.setAttribute("download", filename + ".csv");
     dwldLink.style.visibility = "hidden";
     document.body.appendChild(dwldLink);
     dwldLink.click();
     document.body.removeChild(dwldLink);
 }
 
 ConvertToCSV(objArray, headerList) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = 'S.No,';
 
      for (let index in headerList) {
          row += headerList[index] + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < array.length; i++) {
          let line = (i+1)+'';
          for (let index in headerList) {
             let head = headerList[index];
 
              line += ',' + array[i][head];
          }
          str += line + '\r\n';
      }
      return str;
  }

  
}
