import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {
  FooterModule,
  PreloaderModule,
  ToolbarModule
} from '@app/shared/components';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    PreloaderModule,
    ToolbarModule,
    SharedModule,
    FooterModule
  ]
})
export class LayoutModule { }
