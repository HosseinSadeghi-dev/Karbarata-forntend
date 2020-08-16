import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputComponent } from './tag-input.component';
import {SharedModule} from '../../../shared.module';



@NgModule({
  declarations: [TagInputComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TagInputComponent]
})
export class TagInputModule { }
