import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import { InboxRoutingModule } from './inbox-routing.module';

import {
  MainComponent,
  HomeComponent
} from './pages';
import { FormComponent } from './pages/form/form.component';
import {PipesModule} from "../../../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    FormComponent
  ],
    imports: [
        CommonModule,
        InboxRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class InboxModule { }
