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
        path: 'workforce',
        loadChildren: () => import('./pages/workforce/workforce.module').then(m => m.WorkforceModule)
      },
      {
        path: 'adminstrative',
        loadChildren: () => import('./pages/adminstrative/adminstrative.module').then(m => m.AdminstrativeModule)
      },
      {
        path: '',
        component: ListComponent,
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
export class UserRoutingModule { }
