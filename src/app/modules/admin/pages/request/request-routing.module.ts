import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ListComponent,
  MainComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: ListComponent
      },
      {
       path: 'simple',
        loadChildren: () => import('./pages/simple/simple.module').then(m => m.SimpleModule)
      },
      {
        path: 'master',
        loadChildren: () => import('./pages/master/master.module').then(m => m.MasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
