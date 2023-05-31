import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import {
  GroupingState,
  ITableState,
  PaginatorState,
  SortState,
  TableResponseModel,
  TableService
} from 'src/app/_metronic/shared/crud-table';
import { environment } from 'src/environments/environment';
import { IvrsPage } from '../_models/ivrs.model';

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
export class ivrsService extends TableService<IvrsPage> implements OnDestroy {
  API_URL = `${environment.apiUrl}/ivrs`;

  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  getLotNo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/lotno`);
  }

  find(tableState: ITableState): Observable<TableResponseModel<IvrsPage>> {
    return this.http.get<IvrsPage[]>(this.API_URL).pipe(
      map((response: IvrsPage[]) => {
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<IvrsPage> = {
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
    return this.http.get<IvrsPage[]>(this.API_URL).pipe(
      map((ivrsPage: IvrsPage[]) => {
        return ivrsPage
          .filter(c => ids.indexOf(c.id) > -1)
          .map(c => {
            //c.status = status;
            return c;
          });
      }),
      exhaustMap((ivrsPage: IvrsPage[]) => {
        const tasks$ = [];
        ivrsPage.forEach(ivrsPage => {
          tasks$.push(this.update(ivrsPage));
        });
        return forkJoin(tasks$);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
