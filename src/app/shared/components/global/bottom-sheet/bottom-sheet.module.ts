import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet.component';
import { SharedModule } from '@app/shared/shared.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';



@NgModule({
  declarations: [BottomSheetComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class BottomSheetModule { }
