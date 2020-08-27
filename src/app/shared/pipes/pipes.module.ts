import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnumToArrayPipe} from './enum-to-array.pipe';
import { PersianDatePipe } from './persian-date.pipe';
import { SrcImagePipe } from './src-image.pipe';
import { SimpleWorkerEnum } from './simple-worker-enum.pipe';
import { WorkforceStatusPipe } from './workforce-status.pipe'



@NgModule({
  declarations: [
    EnumToArrayPipe,
    PersianDatePipe,
    SrcImagePipe,
    SimpleWorkerEnum,
    WorkforceStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EnumToArrayPipe,
    PersianDatePipe,
    SrcImagePipe,
    SimpleWorkerEnum,
    WorkforceStatusPipe
  ],
  providers: [
    EnumToArrayPipe,
    SimpleWorkerEnum,
    WorkforceStatusPipe
  ]
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [ EnumToArrayPipe ]
    };
  }
}
