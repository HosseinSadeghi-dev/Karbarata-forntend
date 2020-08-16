import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagDialogComponent } from './tag-dialog.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [TagDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [TagDialogComponent]
})
export class TagDialogModule { }
