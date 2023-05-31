import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsummaryComponent } from './accountsummary/accountsummary.component';
import { CustomerModuleComponent } from './customer-module.component';
import { LotNumberComponent } from './lot-number/lot-number.component';
import { ViewpermitsComponent } from './viewpermits/viewpermits.component';
import { CustomercourtesyCardsComponent } from './customercourtesy-cards/customercourtesy-cards.component';
import { CustomerBplateComponent } from './customer-bplate/customer-bplate.component';
import { CustCourtesycardsComponent } from './cust-courtesycards/cust-courtesycards.component';
import { ManagepermitEditComponent } from '../e-commerce/manage-permits/managepermit-edit/managepermit-edit.component'
//'../ECommerceComponent//manage-permits/managepermit-edit/managepermit-edit.component';

const routes: Routes = [
    {
        path: '', component: CustomerModuleComponent,
        children: [
            // { path: 'lotnumber', component: LotNumberComponent },
            { path: 'accountsummary', component: AccountsummaryComponent },
            { path: 'viewpermits', component: ViewpermitsComponent },
            { path: 'cust-courtesycards', component: CustomercourtesyCardsComponent },
            { path: 'cust-bplate', component: CustomerBplateComponent },
            { path: 'courtesycards', component: CustCourtesycardsComponent },
            {
                path: 'managepermit/add',
                component: ManagepermitEditComponent
              },
            { path: '', redirectTo: 'customer', pathMatch: 'full' },
            { path: '**', redirectTo: 'customer', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerRoutingModule { }
