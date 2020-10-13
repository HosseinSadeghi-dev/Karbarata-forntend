import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent, MainComponent, ShowComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'category/:category',
        component: HomeComponent,
        data: {
          title: 'بلاگ',
          breadcrumb: 'نمایش بر اساس دسته'
        }
      },
      {
        path: ':tag/tag',
        component: HomeComponent,
        data: {
          title: 'بلاگ',
          breadcrumb: 'نمایش بر اساس برچسب'
        }
      },
      {
        path: ':author/author',
        component: HomeComponent,
        data: {
          title: 'بلاگ',
          breadcrumb: 'نمایش بر اساس نویسنده'
        }
      },
      {
        path: ':slug',
        component: ShowComponent,
        data: {
          title: 'نمایش پست',
          breadcrumb: 'نمایش پست'

        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
