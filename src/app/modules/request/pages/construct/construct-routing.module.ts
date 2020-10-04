import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CategoryComponent,
  MainComponent, RequestComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/request/construct',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: CategoryComponent
      },
      {
        path: ':slug',
        component: RequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructRoutingModule { }
