import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent,
  ListComponent,
  FormComponent
} from "./pages";

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':id',
        component:FormComponent,
        data: {
          breadcrumb: 'ویرایش کاربر'
        }
      },
      {
        path: 'create',
        component:FormComponent,
        data: {
          breadcrumb: 'ایجاد کاربر'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
