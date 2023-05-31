import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
 import { TableService,TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from 'src/app/_metronic/shared/crud-table';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Bplate } from '../_models/bplate.model';
import { FileDispute } from '../_models/filedispute.model';


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
export class FileDisputeService extends TableService<FileDispute> implements OnDestroy {
  
  API_URL = `${environment.apiUrl}/filedispute`;
  
   constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<FileDispute>> {
    return this.http.get<FileDispute[]>(this.API_URL).pipe(
      map((response: FileDispute[]) => {
        
        const filteredResult = baseFilter(response, tableState);
        
        const result: TableResponseModel<FileDispute> = {
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
    return this.http.get<FileDispute[]>(this.API_URL).pipe(
      map((FileDispute: FileDispute[]) => {
        return FileDispute.filter(c => ids.indexOf(c.id) > -1).map(c => {
          //c.status = status;
          return c;
        });
      }),
      exhaustMap((FileDispute: FileDispute[]) => {
        const tasks$ = [];
        FileDispute.forEach(FileDispute => {
          tasks$.push(this.update(FileDispute));
        });
        return forkJoin(tasks$);
      })
    );
  }

 
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  submitForm(payLoad: any): Observable<any> {
      console.log("payLoad",payLoad);
    return this.http.post<any>(`${environment.apiUrl}` + '/disputestatus', payLoad);
  }

}
