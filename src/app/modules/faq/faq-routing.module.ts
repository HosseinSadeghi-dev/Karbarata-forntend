import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent,
  HomeComponent
} from './pages'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'faq',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':category',
        component: HomeComponent,
        data: {
          title: 'سئوالات',
          breadcrumb: 'نمایش بر اساس دسته'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
