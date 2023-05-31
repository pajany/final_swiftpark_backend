import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { CustomerLoginComponent } from '../customer-module/customer-login/customer-login.component';
import { LotNumberComponent } from '../customer-module/lot-number/lot-number.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'superadminlogin', pathMatch: 'full' },
      { path: 'superadminlogin', component: LoginComponent, data: { returnUrl: window.location.pathname } },
      { path: 'customerlogin', component: CustomerLoginComponent, pathMatch: 'full', data: { returnUrl: window.location.pathname } },
      { path: 'lotnumber', component: LotNumberComponent, pathMatch: 'full', data: { returnUrl: window.location.pathname } },
      { path: 'registration', component: RegistrationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '', redirectTo: 'superadminlogin', pathMatch: 'full' },
      { path: '**', redirectTo: 'superadminlogin', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
