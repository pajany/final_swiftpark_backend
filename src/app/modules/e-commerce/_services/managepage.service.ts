import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
 import { TableService,TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from 'src/app/_metronic/shared/crud-table';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ManagePage } from '../_models/managepage.model';

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
export class ManagePageService extends TableService<ManagePage> implements OnDestroy {
  
  API_URL = `${environment.apiUrl}/managepage`;

   constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<ManagePage>> {
    return this.http.get<ManagePage[]>(this.API_URL).pipe(
      map((response: ManagePage[]) => {
        
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<ManagePage> = {
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

  updateStatusForItems(ids: number[], status: number): Observable<any> {
    return this.http.get<ManagePage[]>(this.API_URL).pipe(
      map((managepage: ManagePage[]) => {
        return managepage.filter(c => ids.indexOf(c.id) > -1).map(c => {
          //c.status = status;
          return c;
        });
      }),
      exhaustMap((managepage: ManagePage[]) => {
        const tasks$ = [];
        managepage.forEach(managepage => {
          tasks$.push(this.update(managepage));
        });
        return forkJoin(tasks$);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
