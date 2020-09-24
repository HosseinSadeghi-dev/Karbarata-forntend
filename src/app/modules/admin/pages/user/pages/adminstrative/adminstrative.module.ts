import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminstrativeRoutingModule } from './adminstrative-routing.module';
import { FormComponent } from './pages/form/form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonCardModule, UserButtonModule} from "../../../../../../shared/components";
import {PipesModule} from "../../../../../../shared/pipes/pipes.module";
import {SharedModule} from "../../../../../../shared/shared.module";
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';



@NgModule({
  declarations: [FormComponent, MainComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminstrativeRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    ButtonCardModule,
    UserButtonModule
  ]
})
export class AdminstrativeModule { }
