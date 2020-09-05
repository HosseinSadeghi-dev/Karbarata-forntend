import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestExpertComponent } from './request-expert.component';
import {SharedModule} from "../../../shared.module";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestExpertComponent],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class RequestExpertModule { }
