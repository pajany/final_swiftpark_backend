import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
 import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class fileDisputeService {
  constructor(public http: HttpClient) {}

  private selectedheader = new BehaviorSubject<string>('');
  castSlug = this.selectedheader.asObservable();
 
  submitForm(payLoad: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}` + '/permit', payLoad);
  }
  
}
