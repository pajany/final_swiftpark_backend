import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { GroupingState, ITableState, PaginatorState, SortState } from 'src/app/_metronic/shared/crud-table';
import { ViewPermitService } from '../../e-commerce/_services';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

@Component({
  selector: 'app-viewpermits',
  templateUrl: './viewpermits.component.html',
  styleUrls: ['./viewpermits.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ViewpermitsComponent implements OnInit {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  totalrec: any;
  isLoading: boolean;
  isAdminMenu: boolean = false;
  private subscriptions: Subscription[] = [];
  fromDate: Date = null;
  toDate: Date = null;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public viewpermitService: ViewPermitService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig
  ) {}

  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.viewpermitService.fetch();
    this.totalrec = this.viewpermitService.fetch();
    this.grouping = this.viewpermitService.grouping;
    this.paginator = this.viewpermitService.paginator;
    this.sorting = this.viewpermitService.sorting;
    const sb = this.viewpermitService.isLoading$.subscribe(res => (this.isLoading = res));
    this.subscriptions.push(sb);
   }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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
    this.viewpermitService.patchState({ sorting });
  }
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: ['']
    });
    this.subscriptions.push(this.filterGroup.controls.status.valueChanges.subscribe(() => this.filter()));
    this.subscriptions.push(this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter()));
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
    this.viewpermitService.patchState({ filter });
  }

  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: ['']
    });
  }
  // filter() {
  //   const filter = {
  //     fromDate: null,
  //     todate: null
  //   };
  //   filter.fromDate = this.fromDate;
  //   filter.todate = this.toDate;
  //   this.viewpermitService.patchdateState({ filter });
  //   this.totalrec = this.viewpermitService.fetch();
  //   debugger;
  //   this.grouping = this.viewpermitService.grouping;
  //   this.paginator = this.viewpermitService.paginator;
  //   this.sorting = this.viewpermitService.sorting;
  //   const sb = this.viewpermitService.isLoading$.subscribe(res => (this.isLoading = res));
  //   this.subscriptions.push(sb);
  // }

  // pagination
  paginate(paginator: PaginatorState) {
    
    const fromdate = this.fromDate;
    const todate = this.toDate;
    this.viewpermitService.fetchwithdate(fromdate, todate);
    //this.viewpermitService.patchState({ paginator });
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onDateSelection(date: NgbDate) {
    // if (!this.fromDate && !this.toDate) {
    //   this.fromDate = date;
    // } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
    //   this.toDate = date;
    // } else {
    //   this.toDate = null;
    //   this.fromDate = date;
    // }
  }

  save() {
    const fromdate = this.fromDate;
    const todate = this.toDate;
    this.viewpermitService.fetchwithdate(fromdate, todate);
  }
}
