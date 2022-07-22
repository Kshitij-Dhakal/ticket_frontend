import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './shows.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', component: ShowsComponent },
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
export class ShowsRouterModule { }
