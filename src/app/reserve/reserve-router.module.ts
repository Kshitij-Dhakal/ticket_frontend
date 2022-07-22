import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './reserve.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', component: ReserveComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReserveRouterModule { }
