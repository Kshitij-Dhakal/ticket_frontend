import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsRouterModule } from './shows-router.module';
import { ShowsComponent } from './shows.component';
import { HttpClientModule } from '@angular/common/http';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ShowsComponent
  ],
  imports: [
    CommonModule,
    ShowsRouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HttpClientModule,
  ]
})
export class ShowsModule { }
