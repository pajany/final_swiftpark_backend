import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
//import { EditSpecModalComponent } from './products/product-edit/specifications/edit-spec-modal/edit-spec-modal.component';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { BplateComponent } from './bplate/bplate.component';
import { EditBplateModalComponent } from './bplate/components/edit-bplate-modal/edit-bplate-modal.component';
import { DeleteCourtesycardModalComponent } from './courtesy-card/components/delete-courtesycard-modal/delete-courtesycard-modal.component';
import { DeleteCourtesycardsModalComponent } from './courtesy-card/components/delete-courtesycards-modal/delete-courtesycards-modal.component';
import { EditCourtesycardModalComponent } from './courtesy-card/components/edit-courtesycard-modal/edit-courtesycard-modal.component';
import { FetchCourtesycardModalComponent } from './courtesy-card/components/fetch-courtesycard-modal/fetch-courtesycard-modal.component';
import { UpdateCourtesycardModalComponent } from './courtesy-card/components/update-courtesycard-modal/update-courtesycard-modal.component';
import { CourtesyCardComponent } from './courtesy-card/courtesy-card.component';
import { CourtesycardDetailsComponent } from './courtesycard-details/courtesycard-details.component';
import { DeleteCustomerModalComponent } from './customers/components/delete-customer-modal/delete-customer-modal.component';
import { DeleteCustomersModalComponent } from './customers/components/delete-customers-modal/delete-customers-modal.component';
import { EditCustomerModalComponent } from './customers/components/edit-customer-modal/edit-customer-modal.component';
import { FetchCustomersModalComponent } from './customers/components/fetch-customers-modal/fetch-customers-modal.component';
import { UpdateCustomersStatusModalComponent } from './customers/components/update-customers-status-modal/update-customers-status-modal.component';
import { CustomersComponent } from './customers/customers.component';
import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ECommerceComponent } from './e-commerce.component';
import { FaqAddComponent } from './faq/faq-add/faq-add.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component';
import { FaqComponent } from './faq/faq.component';
import { EditFiledisputeModalComponent } from './filedispute/components/edit-filedispute-modal/edit-filedispute-modal.component';
import { FiledisputeComponent } from './filedispute/filedispute.component';
import { IncomeReportComponent } from './income-report/income-report.component';
import { DeleteivrslotnumberComponent } from './ivrs-credentials/components/deleteivrslotnumber/deleteivrslotnumber.component';
import { EditivrsComponent } from './ivrs-credentials/components/editivrs/editivrs.component';
import { IvrsCredentialsComponent } from './ivrs-credentials/ivrs-credentials.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { ErrorModalComponentComponent } from './manage-permits/editpermiterror/error-modal-component/error-modal-component.component';
import { ManagePermitsComponent } from './manage-permits/manage-permits.component';
import { ManagepermitEditComponent } from './manage-permits/managepermit-edit/managepermit-edit.component';
import { DeleteManagepageModalComponent } from './managepages/components/delete-managepage-modal/delete-managepage-modal.component';
import { DeleteManagepagesModalComponent } from './managepages/components/delete-managepages-modal/delete-managepages-modal.component';
import { FetchManagepagesModalComponent } from './managepages/components/fetch-managepages-modal/fetch-managepages-modal.component';
import { UpdateManagepagesStatusModalComponent } from './managepages/components/update-managepages-status-modal/update-managepages-status-modal.component';
import { ManagepageEditComponent } from './managepages/managepage-edit/managepage-edit.component';
import { ManagepagesComponent } from './managepages/managepages.component';
import { PaymentComponent } from './payment/payment.component';
import { DeleteProductModalComponent } from './products/components/delete-product-modal/delete-product-modal.component';
import { DeleteProductsModalComponent } from './products/components/delete-products-modal/delete-products-modal.component';
import { FetchProductsModalComponent } from './products/components/fetch-products-modal/fetch-products-modal.component';
import { UpdateProductsStatusModalComponent } from './products/components/update-products-status-modal/update-products-status-modal.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
//import { SpecificationsComponent } from './products/product-edit/specifications/specifications.component';
import { DeleteRemarkModalComponent } from './products/product-edit/remarks/delete-remark-modal/delete-remark-modal.component';
import { DeleteRemarksModalComponent } from './products/product-edit/remarks/delete-remarks-modal/delete-remarks-modal.component';
//import { DeleteSpecModalComponent } from './products/product-edit/specifications/delete-spec-modal/delete-spec-modal.component';
//import { DeleteSpecsModalComponent } from './products/product-edit/specifications/delete-specs-modal/delete-specs-modal.component';
//import { FetchSpecsModalComponent } from './products/product-edit/specifications/fetch-specs-modal/fetch-specs-modal.component';
import { EditRemarkModalComponent } from './products/product-edit/remarks/edit-remark-modal/edit-remark-modal.component';
import { FetchRemarksModalComponent } from './products/product-edit/remarks/fetch-remarks-modal/fetch-remarks-modal.component';
import { RemarksComponent } from './products/product-edit/remarks/remarks.component';
import { ProductsComponent } from './products/products.component';
import { TaxReportComponent } from './tax-report/tax-report.component';
import { ViewPermitsComponent } from './view-permits/view-permits.component';
@NgModule({
  declarations: [
    CustomersComponent,
    ProductsComponent,
    ECommerceComponent,
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    FetchCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    EditCustomerModalComponent,
    DeleteProductModalComponent,
    DeleteProductsModalComponent,
    UpdateProductsStatusModalComponent,
    FetchProductsModalComponent,
    ProductEditComponent,
    RemarksComponent,
    //SpecificationsComponent,
    DeleteRemarkModalComponent,
    DeleteRemarksModalComponent,
    FetchRemarksModalComponent,
    //DeleteSpecModalComponent,
    //DeleteSpecsModalComponent,
    //FetchSpecsModalComponent,
    EditRemarkModalComponent,
    CourtesyCardComponent,
    DeleteCourtesycardModalComponent,
    EditCourtesycardModalComponent,
    FetchCourtesycardModalComponent,
    UpdateCourtesycardModalComponent,
    DeleteCourtesycardsModalComponent,
    LotDetailsComponent,
    AccountSummaryComponent,
    ViewPermitsComponent,
    IncomeReportComponent,
    TaxReportComponent,
    PaymentComponent,
    ManagepagesComponent,
    ManagepageEditComponent,
    DeleteManagepageModalComponent,
    DeleteManagepagesModalComponent,
    FetchManagepagesModalComponent,
    UpdateManagepagesStatusModalComponent,
    FaqComponent,
    FaqEditComponent,
    FaqAddComponent,
    IvrsCredentialsComponent,
    DeleteivrslotnumberComponent,
    EditivrsComponent,
    ManagePermitsComponent,
    ManagepermitEditComponent,
    BplateComponent,
    EditBplateModalComponent,
    FiledisputeComponent,
    EditFiledisputeModalComponent,
    CourtesycardDetailsComponent,
    ErrorModalComponentComponent
    //EditSpecModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ECommerceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgxSpinnerModule,
    QuillModule.forRoot()
  ],
  entryComponents: [
    DeleteCustomerModalComponent,
    DeleteCustomersModalComponent,
    UpdateCustomersStatusModalComponent,
    FetchCustomersModalComponent,
    EditCustomerModalComponent,
    DeleteProductModalComponent,
    DeleteProductsModalComponent,
    UpdateProductsStatusModalComponent,
    FetchProductsModalComponent,
    DeleteRemarkModalComponent,
    DeleteRemarksModalComponent,
    FetchRemarksModalComponent,
    //DeleteSpecModalComponent,
    //DeleteSpecsModalComponent,
    //FetchSpecsModalComponent,
    EditRemarkModalComponent,
    //EditSpecModalComponent
    DeleteCourtesycardModalComponent,
    EditCourtesycardModalComponent,
    FetchCourtesycardModalComponent,
    UpdateCourtesycardModalComponent,
    DeleteCourtesycardsModalComponent,
    EditivrsComponent
  ]
})
export class ECommerceModule {}
