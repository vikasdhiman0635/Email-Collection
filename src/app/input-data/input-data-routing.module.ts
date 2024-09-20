import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeInputComponent } from './take-input/take-input.component';

const routes: Routes = [
  {
    path: '', component: TakeInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputDataRoutingModule { }
