import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CategoryComponent,
  MainComponent, RequestComponent, SkillComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/request/master',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: CategoryComponent,
      },
      {
        path: ':slug',
        component: SkillComponent,
      },
      {
        path: ':slug/:skill',
        component: RequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
