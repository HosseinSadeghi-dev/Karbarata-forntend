import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ListComponent,
  MainComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: ':slug',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
