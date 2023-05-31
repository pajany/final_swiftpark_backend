import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BplateService } from '../../e-commerce/_services';
import { CustBplateService } from '../../e-commerce/_services';
import { CourtesyCardService } from '../../e-commerce/_services';

import {
  GroupingState,
  PaginatorState,
  SortState,
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IUpdateStatusForSelectedAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_metronic/shared/crud-table';
import { CustomerEditBplateModalComponent } from './components/customer-edit-bplate-modal/customer-edit-bplate-modal.component';
import { CustomerDeleteBplateModalComponent } from './components/customer-delete-bplate-modal/customer-delete-bplate-modal.component';

@Component({
  selector: 'app-customer-bplate',
  templateUrl: './customer-bplate.component.html',
  styleUrls: ['./customer-bplate.component.scss']
})
export class CustomerBplateComponent  implements
OnInit,
OnDestroy,
ICreateAction,
IEditAction,
IDeleteAction,
IDeleteSelectedAction,
IFetchSelectedAction,
IUpdateStatusForSelectedAction,
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
    public custbplateservice: CustBplateService
  ) { }

  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.custbplateservice.fetch();
    this.totalrec= this.custbplateservice.fetch();
    this.grouping = this.custbplateservice.grouping;
    this.paginator = this.custbplateservice.paginator;
    this.sorting = this.custbplateservice.sorting;
    const sb = this.custbplateservice.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
    console.log("----------",this.custbplateservice.fetch());
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
    this.custbplateservice.patchState({ filter });
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
    this.custbplateservice.patchState({ searchTerm });
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
    this.custbplateservice.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.custbplateservice.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(CustomerEditBplateModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.custbplateservice.fetch(),
      () => { }
    );
  }

  delete(id: number) {
    const modalRef = this.modalService.open(CustomerDeleteBplateModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => this.custbplateservice.fetch(), () => { });
  }

  deleteSelected() {
    const modalRef = this.modalService.open(CustomerDeleteBplateModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(() => this.custbplateservice.fetch(), () => { });
  }

  updateStatusForSelected() {
    // const modalRef = this.modalService.open(UpdateCourtesycardModalComponent);
    // modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    // modalRef.result.then(() => this.courtesycardService.fetch(), () => { });
  }

  fetchSelected() {
    // const modalRef = this.modalService.open(FetchCourtesycardModalComponent);
    // modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    // modalRef.result.then(() => this.courtesycardService.fetch(), () => { });
  }
}
