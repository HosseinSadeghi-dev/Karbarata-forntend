import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from './pages';

import {
  FormComponent
} from './components';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AlbumModule { }
