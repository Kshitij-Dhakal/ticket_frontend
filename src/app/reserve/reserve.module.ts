import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveRouterModule } from './reserve-router.module';
import { ReserveComponent } from './reserve.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    ReserveComponent
  ],
  imports: [
    CommonModule,
    ReserveRouterModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,

  ]
})
export class ReserveModule { }