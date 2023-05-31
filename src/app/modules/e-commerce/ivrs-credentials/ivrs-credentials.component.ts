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
import { ivrsService } from '../_services';
import { DeleteivrslotnumberComponent } from './components/deleteivrslotnumber/deleteivrslotnumber.component';
import { EditivrsComponent } from './components/editivrs/editivrs.component';
@Component({
  selector: 'app-ivrs-credentials',
  templateUrl: './ivrs-credentials.component.html',
  styleUrls: ['./ivrs-credentials.component.scss']
})
export class IvrsCredentialsComponent
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

  constructor(private fb: FormBuilder, private modalService: NgbModal, public ivrsService: ivrsService) {}

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.ivrsService.fetch();
    const sb = this.ivrsService.isLoading$.subscribe(res => (this.isLoading = res));
    this.subscriptions.push(sb);
    this.grouping = this.ivrsService.grouping;
    this.paginator = this.ivrsService.paginator;
    this.sorting = this.ivrsService.sorting;
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
    this.ivrsService.patchState({ filter });
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
    this.ivrsService.patchState({ searchTerm });
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
    this.ivrsService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.ivrsService.patchState({ paginator });
  }
  // actions
  delete(id: number) {
    const modalRef = this.modalService.open(DeleteivrslotnumberComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.ivrsService.fetch(),
      () => {}
    );
  }

  deleteSelected() {}

  updateStatusForSelected() {}

  fetchSelected() {}

  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditivrsComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.ivrsService.fetch(),
      () => {}
    );
  }
}
