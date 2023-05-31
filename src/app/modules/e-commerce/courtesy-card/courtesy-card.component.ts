// tslint:disable:no-string-literal
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  GroupingState,
  ICreateAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IEditAction,
  IFetchSelectedAction,
  IFilterView,
  IGroupingView,
  ISearchView,
  ISortView,
  IUpdateStatusForSelectedAction,
  PaginatorState,
  SortState
} from '../../../_metronic/shared/crud-table';
import { CourtesyCardService, ProductsService } from '../_services';
import { DeleteCourtesycardModalComponent } from './components/delete-courtesycard-modal/delete-courtesycard-modal.component';
import { DeleteCourtesycardsModalComponent } from './components/delete-courtesycards-modal/delete-courtesycards-modal.component';
import { EditCourtesycardModalComponent } from './components/edit-courtesycard-modal/edit-courtesycard-modal.component';
import { FetchCourtesycardModalComponent } from './components/fetch-courtesycard-modal/fetch-courtesycard-modal.component';
import { UpdateCourtesycardModalComponent } from './components/update-courtesycard-modal/update-courtesycard-modal.component';

@Component({
  selector: 'app-courtesy-card',
  templateUrl: './courtesy-card.component.html',
  styleUrls: ['./courtesy-card.component.scss']
})
export class CourtesyCardComponent
  implements
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
    IFilterView
{
  @Input() id: number;

  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  totalrec: any;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  API_URL = `${environment.apiUrl}/`;
  lotList: any[] = [];
  lotNo: any;
  lotNumber: number = 0;
  selectedId: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public router: ActivatedRoute,
    private route: Router,
    public courtesycardService: CourtesyCardService,
    public productsService: ProductsService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  // angular lifecircle hooks
  ngOnInit(): void {
    this.lotNo = '10200';

    // this.getlotnumber(this.lotNo);
    // this.spinner.show();
     this.productsService.custfetch();
    this.courtesycardService.fetch();
    this.totalrec = this.courtesycardService.fetch();
    this.grouping = this.courtesycardService.grouping;
    this.paginator = this.courtesycardService.paginator;
    this.sorting = this.courtesycardService.sorting;
    this.filterForm();
    this.searchForm();
  }

  getlotnumber(lotno) {
    this.spinner.show();
    $('.alldatas').hide();
    $('.maintable').show();
    this.http.get(this.API_URL + 'lotbasedcourtesy/?lot_no=' + lotno).subscribe(
      (data: any) => {
        this.lotList = data;
        this.spinner.hide();
      },
      error => {
        console.error(error);
      }
    );
  }

  pagereload() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      searchTerm: ['']
    });
    this.subscriptions.push(this.filterGroup.controls.status.valueChanges.subscribe(() => this.filter()));
  }

  filter() {
    const filter = {};
    const lotno = this.filterGroup.get('status').value;
   
    if (lotno) {
      filter['lot_no'] = lotno;
    }

    this.courtesycardService.patchState({ filter });
    $('.alldatas').hide();
    $('.maintable').show();
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
    this.courtesycardService.patchState({ searchTerm });
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
    this.courtesycardService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.courtesycardService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  showreport() {
    $('.maintable').hide();
    $('.alldatas').show();
    var $HTMLData = '';
    this.http.get(this.API_URL + 'courtesycard').subscribe((data: any) => {
      $('#CourtesyTable').empty();
      $HTMLData = '<html>';
      $HTMLData += '<body>';
      console.log('current data', data);
      if (data.success == 'No Result found') {
        $HTMLData += '<tr>';
        $HTMLData +=
          '<td > <span class="nodata" style="text-align: center;color: #5dab14;"><h5> No Record Found! </h5> </span> </td>';
        $HTMLData += '</tr>';
      }
      if (data.success != 'No Result found') {
        $HTMLData += '<table class="table table-head-custom table-vertical-center overflow-hidden" style="width:90%;">';
        $HTMLData += '<thead class="thead-light">';
        $HTMLData += '<tr>';
        $HTMLData +=
          ' <th class="selection-cell-header" data-row-selection="true"><label class="checkbox checkbox-single">';
        $HTMLData +=
          '<input type="checkbox" (click)="grouping.selectAllRows()" [checked]="grouping.checkAreAllRowsSelected()" /><span></span></label></th>';

        $HTMLData += '<th scope="col">Card No</th>';
        $HTMLData += '<th scope="col">CardPin</th>';
        $HTMLData += '<th scope="col">Avail Calls</th>';
        $HTMLData += '<th scope="col">Default Calls </th>';
        $HTMLData += '<th scope="col">CardType</th>';
        $HTMLData += '</tr>';
        $HTMLData += '</thead>';
        $HTMLData += '<tbody>';

        if (data) {
          for (var i = 0; i < data.length; i++) {
            $HTMLData += '<tr>';
            $HTMLData += '<td class="selection-cell"><label class="checkbox checkbox-single">';
            $HTMLData +=
              '<input type="checkbox" (click)="grouping.selectRow(' +
              data[i].id +
              ')" [checked]="grouping.isRowSelected(' +
              data[i].id +
              ')" /><span></span></label></td>';
            $HTMLData += '<td>' + data[i].card_no + '</td>';
            $HTMLData += '<td>' + data[i].card_pin + '</td>';
            $HTMLData += '<td>' + data[i].calls + '</td>';
            $HTMLData += '<td>' + data[i].defaultcalls + '</td>';
            $HTMLData += '<td>' + data[i].card_type + '</td>';
            $HTMLData += '</tr>';
          }
        }

        $HTMLData += '</tbody>';
        $HTMLData += '</table>';
        $HTMLData += '</br>';
      }
      $HTMLData += '</body>';
      $HTMLData += '</html>';

      if (data) {
        $('#CourtesyTable').append($HTMLData);
        $('.lotdata').show();
      } else {
        $('.lotdata').hide();
      }
    });
  }

  popupedit(id) {
    this.edit(id);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditCourtesycardModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.courtesycardService.fetch(),
      () => {}
    );
  }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteCourtesycardModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.courtesycardService.fetch(),
      () => {}
    );
  }

  deleteSelected() {
    const modalRef = this.modalService.open(DeleteCourtesycardsModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.courtesycardService.fetch(),
      () => {}
    );
  }

  updateStatusForSelected() {
    const modalRef = this.modalService.open(UpdateCourtesycardModalComponent, { size: 'xl' });
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.courtesycardService.fetch(),
      () => {}
    );
  }

  fetchSelected() {
    const modalRef = this.modalService.open(FetchCourtesycardModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(
      () => this.courtesycardService.fetch(),
      () => {}
    );
  }
}
