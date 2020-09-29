import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import {FooterModule, PreloaderModule} from '@app/shared/components';
import {PipesModule} from '@app/shared/pipes/pipes.module';
import {CdkAccordionModule} from '@angular/cdk/accordion';

import {
  MainComponent,
  HomeComponent
} from './pages';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MenuListItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    PreloaderModule,
    FooterModule,
    PipesModule,
    CdkAccordionModule
  ]
})
export class AdminModule { }
