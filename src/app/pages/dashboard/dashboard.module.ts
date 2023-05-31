import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ]),
    DashboardsModule
  ]
})
export class DashboardModule {}
