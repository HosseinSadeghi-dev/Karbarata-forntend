import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoRoutingModule } from './photo-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {PhotoUploadFormModule} from '@app/shared/components';
import {FormsModule} from '@angular/forms';

import {
  ListComponent,
  MainComponent
} from './pages';

import {
  FormDialogComponent,
  ShowDialogComponent
} from './components';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormDialogComponent,
    ShowDialogComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    PhotoUploadFormModule,
    FormsModule
  ]
})
export class PhotoModule { }
