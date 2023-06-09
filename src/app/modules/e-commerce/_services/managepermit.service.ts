import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
 import { TableService,TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from 'src/app/_metronic/shared/crud-table';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ManagePermit } from '../_models/managepermit.model';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

@Injectable({
  providedIn: 'root'
})
export class ManagePermitService extends TableService<ManagePermit> implements OnDestroy {
  
  API_URL = `${environment.apiUrl}/showallpermit`;
   constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<ManagePermit>> {
    return this.http.get<ManagePermit[]>(this.API_URL).pipe(
      map((response: ManagePermit[]) => {
        
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<ManagePermit> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
      })
    );
  }

  deleteItems(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    ids.forEach(id => {
      tasks$.push(this.delete(id));
    });
    return forkJoin(tasks$);
  }

   

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
