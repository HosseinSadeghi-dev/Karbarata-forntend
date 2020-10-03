import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {DownloadComponent, HomeComponent} from "./pages";
import { SharedModule } from '@app/shared/shared.module';
import { SampleWorkComponent } from './containers';
import { ImageLazyModule } from '@app/shared/components';
import { PipesModule } from '@app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent,
    SampleWorkComponent,
    DownloadComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ImageLazyModule,
    PipesModule
  ]
})
export class MainModule { }
