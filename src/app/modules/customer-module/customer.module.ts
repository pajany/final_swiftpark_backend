import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRoutingModule } from './customer-routing.module';

// import components 
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerModuleComponent } from './customer-module.component';
import { LotNumberComponent } from './lot-number/lot-number.component';
// import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountsummaryComponent } from './accountsummary/accountsummary.component';
import { ViewpermitsComponent } from './viewpermits/viewpermits.component';
import { CustomercourtesyCardsComponent } from './customercourtesy-cards/customercourtesy-cards.component';
import { CustomerBplateComponent } from './customer-bplate/customer-bplate.component';
import { CustomerEditBplateModalComponent } from './customer-bplate/components/customer-edit-bplate-modal/customer-edit-bplate-modal.component';
import { CustomerDeleteBplateModalComponent } from './customer-bplate/components/customer-delete-bplate-modal/customer-delete-bplate-modal.component';
import { CustCourtesycardsComponent } from './cust-courtesycards/cust-courtesycards.component';
import { CustCourtesycardsEditComponent } from './cust-courtesycards/components/cust-courtesycards-edit/cust-courtesycards-edit.component';
// import { ViewPermitsComponent } from './view-permits/view-permits.component';

@NgModule({
    declarations: [
        CustomerModuleComponent,
        CustomerLoginComponent,
        LotNumberComponent, 
        AccountsummaryComponent,
        ViewpermitsComponent,
        CustomercourtesyCardsComponent,
        CustomerBplateComponent,
        CustomerEditBplateModalComponent,
        CustomerDeleteBplateModalComponent,
        CustCourtesycardsComponent,
        CustCourtesycardsEditComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        CustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        InlineSVGModule,
        CRUDTableModule,
        NgbModalModule,
        NgbDatepickerModule
    ],
    entryComponents: [
    ]
})
export class CustomerModule { }
