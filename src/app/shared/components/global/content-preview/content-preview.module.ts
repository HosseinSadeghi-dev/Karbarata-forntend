import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPreviewComponent } from './content-preview.component';
import {RouterModule} from '@angular/router';
import {ImageLazyModule} from '../..';
import {SharedModule} from '../../../shared.module';
import {PipesModule} from "@app/shared/pipes/pipes.module";



@NgModule({
  declarations: [ContentPreviewComponent],
    imports: [
        CommonModule,
        ImageLazyModule,
        RouterModule,
        SharedModule,
        PipesModule
    ],
  exports: [ContentPreviewComponent]
})
export class ContentPreviewModule { }
