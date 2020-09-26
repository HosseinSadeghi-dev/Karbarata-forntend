import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent
} from './pages';

import {
  LoginFormComponent,
  RegisterFormComponent,
  VerifyFormComponent,
} from './containers';


const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'register',
        component: RegisterFormComponent
      },
      {
        path: 'verify',
        component: VerifyFormComponent

      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
