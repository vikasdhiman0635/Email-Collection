import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputDataRoutingModule } from './input-data-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputDataRoutingModule,
    HttpClientModule
  ]
})
export class InputDataModule { }
