import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(public http: HttpClient) {}

  private selectedheader = new BehaviorSubject<string>('');
  castSlug = this.selectedheader.asObservable();

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}` + '/dashboard');
  }
}
