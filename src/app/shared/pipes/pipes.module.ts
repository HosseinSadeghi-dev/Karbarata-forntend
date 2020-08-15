import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnumToArrayPipe} from './enum-to-array.pipe';
import { PersianDatePipe } from './persian-date.pipe';
import { SrcImagePipe } from './src-image.pipe';



@NgModule({
  declarations: [
    EnumToArrayPipe,
    PersianDatePipe,
    SrcImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EnumToArrayPipe,
    PersianDatePipe,
    SrcImagePipe
  ],
  providers: [
    EnumToArrayPipe
  ]
})
export class PipesModule { }
