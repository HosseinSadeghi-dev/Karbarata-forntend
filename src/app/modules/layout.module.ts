import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {SharedModule} from "@app/shared/shared.module";
import {SupportButtonModule} from "@app/shared/components";
import {
  FooterModule,
  ToolbarModule
} from '@app/shared/components';

@NgModule({
  declarations: [LayoutComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        ToolbarModule,
        SharedModule,
        FooterModule,
        SupportButtonModule
    ]
})
export class LayoutModule { }
