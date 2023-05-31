import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { CourtesyCardComponent } from './courtesy-card/courtesy-card.component';
import { CustomersComponent } from './customers/customers.component';
import { ECommerceComponent } from './e-commerce.component';
import { FaqAddComponent } from './faq/faq-add/faq-add.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component';
import { FaqComponent } from './faq/faq.component';
import { IncomeReportComponent } from './income-report/income-report.component';
import { IvrsCredentialsComponent } from './ivrs-credentials/ivrs-credentials.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { ManagepageEditComponent } from './managepages/managepage-edit/managepage-edit.component';
import { ManagepagesComponent } from './managepages/managepages.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductsComponent } from './products/products.component';
import { TaxReportComponent } from './tax-report/tax-report.component';
import { ViewPermitsComponent } from './view-permits/view-permits.component';
import { ManagePermitsComponent } from './manage-permits/manage-permits.component';
import { ManagepermitEditComponent } from './manage-permits/managepermit-edit/managepermit-edit.component';
import { BplateComponent } from './bplate/bplate.component';
import { FiledisputeComponent } from './filedispute/filedispute.component';
import { CourtesycardDetailsComponent } from './courtesycard-details/courtesycard-details.component';


const routes: Routes = [
  {
    path: '',
    component: ECommerceComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'courtesycard',
        component: CourtesyCardComponent
      },
      {
        path: 'lotdetails',
        component: LotDetailsComponent
      },
      {
        path: 'courtesycarddetails',
        component: CourtesycardDetailsComponent
      },
      
      {
        path: 'accountsummary',
        component: AccountSummaryComponent
      },
      {
        path: 'viewpermit',
        component: ViewPermitsComponent
      },
      {
        path: 'incomereport',
        component: IncomeReportComponent
      },
      {
        path: 'taxeport',
        component: TaxReportComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'managefaq',
        component: FaqComponent
      },
      {
        path: 'managefaq/add',
        component: FaqAddComponent
      },
      {
        path: 'managefaq/edit',
        component: FaqEditComponent
      },
      {
        path: 'managefaq/edit/:id',
        component: FaqEditComponent
      },
      {
        path: 'ivrs',
        component: IvrsCredentialsComponent
      },
      {
        path: 'managepage',
        component: ManagepagesComponent
      },
      {
        path: 'managepage/add',
        component: ManagepageEditComponent
      },
      {
        path: 'managepage/edit',
        component: ManagepageEditComponent
      },
      {
        path: 'managepage/edit/:id',
        component: ManagepageEditComponent
      },
      {
        path: 'managepermit',
        component: ManagePermitsComponent
      },
      {
        path: 'managepermit/add',
        component: ManagepermitEditComponent
      },
      {
        path: 'managepermit/edit',
        component: ManagepermitEditComponent
      },
      {
        path: 'managepermit/edit/:id',
        component: ManagepermitEditComponent
      },

      {
        path: 'bplate',
        component: BplateComponent
      },
      {
        path: 'filedispute',
        component: FiledisputeComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'product/add',
        component: ProductEditComponent
      },
      {
        path: 'product/edit',
        component: ProductEditComponent
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent
      },
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: '**', redirectTo: 'customers', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule {}
