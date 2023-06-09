// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  GroupingState, 
  IFilterView,
  IGroupingView,
  ISearchView,
  ISortView,
  PaginatorState,
  SortState
} from '../../../_metronic/shared/crud-table';
import { ManagePermitService } from '../_services/managepermit.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-manage-permits',
  templateUrl: './manage-permits.component.html',
  styleUrls: ['./manage-permits.component.scss']
})
export class ManagePermitsComponent 

  implements
    OnInit,
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

  constructor(private fb: FormBuilder, private modalService: NgbModal, public managepermitService: ManagePermitService) {}

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.managepermitService.fetch();
    const sb = this.managepermitService.isLoading$.subscribe(res => (this.isLoading = res));
    this.subscriptions.push(sb);
    this.grouping = this.managepermitService.grouping;
    this.paginator = this.managepermitService.paginator;
    this.sorting = this.managepermitService.sorting;
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
    this.managepermitService.patchState({ filter });
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
    this.managepermitService.patchState({ searchTerm });
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
    this.managepermitService.patchState({ sorting });
  }

  
  // pagination
  paginate(paginator: PaginatorState) {
    this.managepermitService.patchState({ paginator });
  }
  // actions
  pagereload(){
    window.location.reload();

  }
 
}
