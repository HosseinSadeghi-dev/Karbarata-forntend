import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {SharedModule} from '../../../shared.module';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../../pipes/pipes.module';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PipesModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
