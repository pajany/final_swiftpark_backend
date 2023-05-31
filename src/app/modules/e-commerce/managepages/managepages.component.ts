// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  GroupingState,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IFilterView,
  IGroupingView,
  ISearchView,
  ISortView,
  IUpdateStatusForSelectedAction,
  PaginatorState,
  SortState
} from '../../../_metronic/shared/crud-table';
import { ManagePageService } from '../_services';
import { DeleteManagepageModalComponent } from './components/delete-managepage-modal/delete-managepage-modal.component';
import { DeleteManagepagesModalComponent } from './components/delete-managepages-modal/delete-managepages-modal.component';
import { FetchManagepagesModalComponent } from './components/fetch-managepages-modal/fetch-managepages-modal.component';
import { UpdateManagepagesStatusModalComponent } from './components/update-managepages-status-modal/update-managepages-status-modal.component';

@Component({
  selector: 'app-managepages',
  templateUrl: './managepages.component.html',
  styleUrls: ['./managepages.component.scss']
})
export class ManagepagesComponent
  implements
    OnInit,
    OnDestroy,
    IDeleteAction,
    IDeleteSelectedAction,
    IFetchSelectedAction,
    IUpdateStatusForSelectedAction,
    ISortView,
    IFilterView,
    IGroupingView,
    ISearchView,
    IFilterView
{
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder, private modalService: NgbModal, public managepageService: ManagePageService) {}

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.managepageService.fetch();
    console.log('res', this.managepageService.fetch());
    const sb = this.managepageService.isLoading$.subscribe(res => (this.isLoading = res));
    this.subscriptions.push(sb);
    this.grouping = this.managepageService.grouping;
    this.paginator = this.managepageService.paginator;
    this.sorting = this.managepageService.sorting;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      condition: [''],
      searchTerm: ['']
    });
    this.subscriptions.push(this.filterGroup.controls.status.valueChanges.subscribe(() => this.filter()));
    this.subscriptions.push(this.filterGroup.controls.condition.valueChanges.subscribe(() => this.filter()));
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get('status').value;
    if (status) {
      filter['status'] = status;
    }

    const condition = this.filterGroup.get('condition').value;
    if (condition) {
      filter['condition'] = condition;
    }
    this.managepageService.patchState({ filter });
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: ['']
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
      .subscribe(val => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.managepageService.patchState({ searchTerm });
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
    this.managepageService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.managepageService.patchState({ paginator });
  }
  // actions
  delete(id: number) {
    const modalRef = this.modalService.open(DeleteManagepageModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.managepageService.fetch(),
      () => {}
    );
  }

  deleteSelected() {
    const modalRef = this.modalService.open(DeleteManagepagesModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.managepageService.fetch(),
      () => {}
    );
  }

  updateStatusForSelected() {
    const modalRef = this.modalService.open(UpdateManagepagesStatusModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.managepageService.fetch(),
      () => {}
    );
  }

  fetchSelected() {
    const modalRef = this.modalService.open(FetchManagepagesModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.managepageService.fetch(),
      () => {}
    );
  }
}
