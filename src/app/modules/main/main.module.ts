import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SampleWorkComponent } from './containers';
import {FooterFormModule, FooterModule, ImageLazyModule, SkillShowModule} from '@app/shared/components';
import { PipesModule } from '@app/shared/pipes/pipes.module';

import {
  DownloadComponent,
  HomeComponent,
} from "./pages";


@NgModule({
  declarations: [
    HomeComponent,
    SampleWorkComponent,
    DownloadComponent,

  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        ImageLazyModule,
        PipesModule,
        FooterModule,
        FooterFormModule,
        SkillShowModule
    ]
})
export class MainModule { }
