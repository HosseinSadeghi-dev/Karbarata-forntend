import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoUploadFormComponent } from './photo-upload-form.component';
import {SharedModule} from '../../../shared.module';



@NgModule({
  declarations: [PhotoUploadFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [PhotoUploadFormComponent]
})
export class PhotoUploadFormModule { }
