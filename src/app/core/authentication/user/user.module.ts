import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared/shared.module';

import {
  MainComponent
} from './pages';

import {
  LoginFormComponent,
  RegisterFormComponent,
  VerifyFormComponent,
} from './containers';


@NgModule({
  declarations: [
    MainComponent,
    LoginFormComponent,
    RegisterFormComponent,
    VerifyFormComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
