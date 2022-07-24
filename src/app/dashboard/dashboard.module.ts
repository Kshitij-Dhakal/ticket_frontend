import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouterModule } from './dashboard-router.module';
import { SharedModule } from '../shared/shared.module';
import { BollingerBandsComponent } from './bollinger-bands/bollinger-bands.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BollingerBandsComponent
  ],
  imports: [
    CommonModule,
    DashboardRouterModule,
    SharedModule
  ]
})
export class DashboardModule { }
