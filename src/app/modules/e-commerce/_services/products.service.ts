import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService ,TableResponseModel, ITableState, BaseModel } from 'src/app/_metronic/shared/crud-table';
import { Product } from '../_models/product.model';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { lotnoFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends TableService<Product> implements OnDestroy {
  API_URL = `${environment.apiUrl}/admin`;
  lot_active:any;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Product>> {
    return this.http.get<Product[]>(this.API_URL).pipe(
      map((response: Product[]) => {
         
         const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<Product> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
        
      })
    );
  }

  custlist(tableState: ITableState): Observable<TableResponseModel<Product>> {
    return this.http.get<Product[]>(this.API_URL).pipe(
      map((response: Product[]) => {
         
         const filteredResult = lotnoFilter(response, tableState);
        const result: TableResponseModel<Product> = {
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
    return this.http.get<Product[]>(this.API_URL).pipe(
      map((products: Product[]) => {
        return products.filter(c => ids.indexOf(c.id) > -1).map(c => {
          c.lot_active = status;
          return c;
        });
      }),
      exhaustMap((products: Product[]) => {
        const tasks$ = [];
        products.forEach(product => {
          tasks$.push(this.update(product));
        });
        return forkJoin(tasks$);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
