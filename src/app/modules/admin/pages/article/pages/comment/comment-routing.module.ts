import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent,
  ListComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
