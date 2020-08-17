import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {FooterModule, PreloaderModule} from '@app/shared/components';
import {PipesModule} from '@app/shared/pipes/pipes.module';

import {
  MainComponent,
  HomeComponent
} from './pages';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    PreloaderModule,
    FooterModule,
    PipesModule
  ]
})
export class AdminModule { }
