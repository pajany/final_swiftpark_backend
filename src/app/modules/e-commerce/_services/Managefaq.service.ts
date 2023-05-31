import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService ,TableResponseModel, ITableState, BaseModel } from 'src/app/_metronic/shared/crud-table';
 import { Managefaq } from '../_models/Managefaq.model';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
 import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManagefaqService extends TableService<Managefaq> implements OnDestroy {
  //API_URL = `${environment.apiUrl}/products`;
  API_URL = `${environment.apiUrl}/managefaq`;
   constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Managefaq>> {
    return this.http.get<Managefaq[]>(this.API_URL).pipe(
      map((response: Managefaq[]) => {
        const filteredResult = baseFilter(response, tableState);
        
        const result: TableResponseModel<Managefaq> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
        
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
