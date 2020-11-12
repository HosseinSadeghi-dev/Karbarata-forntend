import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [PreloaderComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FlexModule
  ],
  exports: [PreloaderComponent]
})
export class PreloaderModule { }
