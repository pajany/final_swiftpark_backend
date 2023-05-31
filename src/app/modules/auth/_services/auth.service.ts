import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CustomerModel } from '../_models/customer.model';
import { CustomerModule } from '../../customer-module/customer.module';
import { StorageConfiguration } from '../storage-setting/storage-configuration';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  currentCustomer$: Observable<CustomerModule>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  currentCustomerSubject: BehaviorSubject<CustomerModule>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  get currentCustomerValue(): CustomerModule {
    return this.currentCustomerSubject.value;
  }

  set currentCustomerValue(user: CustomerModule) {
    this.currentCustomerSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private storageConfiguration: StorageConfiguration
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentCustomerSubject = new BehaviorSubject<CustomerModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.currentCustomer$ = this.currentCustomerSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    console.log("current user===", this.currentUser$);
  }

  // public methods
  login(email: string, password: string): Observable<UserModel> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem("currentlotno");

    this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.menushow);
    this.router.navigate(['/auth/superadminlogin'], {
      queryParams: {},
    });
  }


  // public methods
  customerLogin(email: string, password: string): Observable<CustomerModel> {
    this.isLoadingSubject.next(true);
     
    return this.authHttpService.customerlogin(email, password).pipe(
      map((auth: AuthModel) => {
        
        if (auth && auth.authToken) {
          const result = this.setAuthFromLocalStorage(auth);
          return result;
        } else {
          localStorage.removeItem(this.authLocalStorageToken);
          this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.menushow);
          return of(undefined);
        }
      }),
      switchMap(() => this.getCustomerUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  customerLotCheck(lot_number: string): Observable<CustomerModel> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.lotNumberCheck(lot_number).pipe(
      map((auth: AuthModel) => {
         
        if (auth && auth.authToken) {
          const result = this.setAuthFromLocalStorage(auth);
          localStorage.setItem("currentlotno", lot_number);

          return result;
        } else {
          localStorage.removeItem(this.authLocalStorageToken);
          this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.menushow);
          return of(undefined);
        }
      }),
      switchMap(() => this.getCustomerUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getCustomerUserByToken(): Observable<CustomerModule> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.authHttpService.getCustomerByToken(auth.authToken).pipe(
      map((user: CustomerModule) => {
        if (user) {
          this.currentCustomerSubject = new BehaviorSubject<CustomerModule>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
