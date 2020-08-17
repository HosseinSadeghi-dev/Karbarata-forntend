import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoUploadFormModule} from '@app/shared/components/gallery/photo-upload-form/photo-upload-form.module';
import {SharedModule} from '../../../shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {
  ButtonComponent,
  DialogComponent,
  TableComponent
} from './components';

@NgModule({
  declarations: [
    ButtonComponent,
    DialogComponent,
    TableComponent
  ],
  exports: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PhotoUploadFormModule,
    ReactiveFormsModule
  ]
})
export class PhotoChooseModule { }
