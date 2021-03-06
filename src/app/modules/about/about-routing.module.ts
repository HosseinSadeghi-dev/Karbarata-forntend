import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  CooperationComponent,
  HomeComponent,
  MainComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'cooperation',
        component: CooperationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
