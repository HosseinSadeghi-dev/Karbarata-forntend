import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule, LayoutGapStyleBuilder} from '@angular/flex-layout';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from './material.persian-date.adapter';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getPersianPaginatorIntl} from './persian-paginator-intl';
import {MaterialModule} from './material/material.module';
import {CustomLayoutGapStyleBuilder} from "./helpers";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LazyLoadImageModule,
    MaterialModule
  ],
  exports: [
    FlexLayoutModule,
    LazyLoadImageModule,
    MaterialModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
    {provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl()},
    { provide: LayoutGapStyleBuilder, useClass: CustomLayoutGapStyleBuilder }
  ]
})
export class SharedModule { }
