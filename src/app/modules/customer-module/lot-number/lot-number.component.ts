import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from '../../auth';
import { StorageConfiguration } from '../../auth/storage-setting/storage-configuration';
import { AuthModel } from '../../auth/_models/auth.model';
import { CustomerModel } from '../../auth/_models/customer.model';
import { GlobalService } from '../../auth/_services/GlobalService';

@Component({
  selector: 'app-lot-number',
  templateUrl: './lot-number.component.html',
  styleUrls: ['./lot-number.component.scss']
})
export class LotNumberComponent implements OnInit {

  defaultAuth = { lot_number: '' };
  lotNumberForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private globleService: GlobalService,
    private router: Router,
    private storageConfiguration: StorageConfiguration
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/customer/accountsummary';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.lotNumberForm.controls;
  }

  initForm() {
    this.lotNumberForm = this.fb.group({
      lot_number: [this.defaultAuth.lot_number, Validators.compose([Validators.required, Validators.maxLength(20),])]
    });
  }

  submit() {
    this.hasError = false;

    const loginSubscr = this.authService.customerLotCheck(this.f.lot_number.value).pipe(first())
      .subscribe((response: any) => {
        console.log("customer response Lot Check", response);
        if (response) {
          const auth = new AuthModel();
          response.forEach(element => {
            if (element.lot_no === this.f.lot_number.value.toString()) {
              auth.authToken = element.authToken;
              auth.refreshToken = element.refreshToken;
              auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
            }
          });
          this.storageConfiguration.sessionSetItem(this.storageConfiguration.menushow, false);
          this.storageConfiguration.setAuthFromLocalStorage(auth)
          this.router.navigate([this.returnUrl]);
          // this.globleService.isAdminLoggedIn = false;
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
    // this.router.navigate([this.returnUrl]);
    // this.globleService.isAdminLoggedIn = false;
  }
  cancelLot() {
    this.router.navigate(['/auth/customerlogin']);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
