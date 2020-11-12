import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLazyComponent } from './image-lazy.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {PipesModule} from "@app/shared/pipes/pipes.module";



@NgModule({
  declarations: [ImageLazyComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    PipesModule
  ],
  exports: [ImageLazyComponent]
})
export class ImageLazyModule { }
