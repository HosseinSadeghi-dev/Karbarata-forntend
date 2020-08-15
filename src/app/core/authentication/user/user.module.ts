import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {FormsModule} from '@angular/forms';
import {PreloaderModule} from '@app/shared/components';
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
    PreloaderModule
  ]
})
export class UserModule { }
