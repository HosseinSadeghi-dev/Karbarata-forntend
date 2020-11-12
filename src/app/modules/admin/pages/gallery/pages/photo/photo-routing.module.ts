import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListComponent, MainComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          breadcrumb: 'تصاویر'
        }
      },
      {
        path: ':album/album',
        component: ListComponent,
        data: {
          breadcrumb: 'نمایش بر اساس آلبوم'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoRoutingModule { }
