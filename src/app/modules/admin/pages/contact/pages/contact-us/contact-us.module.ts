import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactUsRoutingModule} from "./contact-us-routing.module";
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
  FormComponent,
  ListComponent,
  MainComponent
} from "./pages";



@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ContactUsModule { }
