import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DayCounterComponent} from './day-counter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared.module';



@NgModule({
  declarations: [DayCounterComponent],
  exports: [
    DayCounterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DayCounterModule { }
