import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouterModule } from './dashboard-router.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRouterModule,
    SharedModule
  ]
})
export class DashboardModule { }
