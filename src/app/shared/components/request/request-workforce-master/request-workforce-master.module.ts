import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipesModule} from "../../../pipes/pipes.module";
import {SharedModule} from "../../../shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RequestWorkforceMasterComponent} from "./request-workforce-master.component";



@NgModule({
  declarations: [RequestWorkforceMasterComponent],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class RequestWorkforceMasterModule { }
