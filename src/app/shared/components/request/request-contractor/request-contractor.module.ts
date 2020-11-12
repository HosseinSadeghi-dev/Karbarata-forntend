import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestContractorComponent} from "./request-contractor.component";
import {SharedModule} from "../../../shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../pipes/pipes.module";



@NgModule({
  declarations: [RequestContractorComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class RequestContractorModule { }
