import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedRouterModule } from './shared-router.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
