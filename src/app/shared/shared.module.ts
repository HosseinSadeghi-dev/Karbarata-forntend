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
import {
  CancelDirective,
  FavoriteDialogDirective,
  PhotoChooseDirective,
  TagDialogDirective,
  UserChooseDirective,
  RequestReportFormDirective,
  RequestPaymentBottomSheetDirective,
  StatusStatementChooseDirective,
  SkillChooseDirective,
} from '@app/shared/directives';

import {PipesModule} from "@app/shared/pipes/pipes.module";

const directives = [
  CancelDirective,
  PhotoChooseDirective,
  TagDialogDirective,
  FavoriteDialogDirective,
  UserChooseDirective,
  RequestReportFormDirective,
  RequestPaymentBottomSheetDirective,
  StatusStatementChooseDirective,
  SkillChooseDirective
];

@NgModule({
  declarations: [
    directives,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LazyLoadImageModule,
    MaterialModule,
    PipesModule
  ],
  exports: [
    FlexLayoutModule,
    LazyLoadImageModule,
    MaterialModule,
    directives,
  ],
  providers: [
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
    {provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl()},
    { provide: LayoutGapStyleBuilder, useClass: CustomLayoutGapStyleBuilder }
  ]
})
export class SharedModule { }
