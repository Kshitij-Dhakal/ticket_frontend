import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRouterModule } from './reserve-router.module';
import { ReserveComponent } from './reserve.component';



@NgModule({
  declarations: [
    ReserveComponent
  ],
  imports: [
    CommonModule,
    ReserveRouterModule
  ]
})
export class ReserveModule { }
