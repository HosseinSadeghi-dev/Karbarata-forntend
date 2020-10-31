import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreYouSureComponent } from './are-you-sure.component';
import {SharedModule} from '../../../shared.module';



@NgModule({
  declarations: [AreYouSureComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class AreYouSureModule { }
