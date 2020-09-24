import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HomeComponent,
  MainComponent
} from './pages';


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
        path:'faq',
        loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule)
      },
      {
        path: 'construct',
        loadChildren: () => import('./pages/construct/construct.module').then(m => m.ConstructModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'workforce',
        loadChildren: () => import('./pages/workforce/workforce.module').then(m => m.WorkforceModule)
      },
      {
        path: 'request',
        loadChildren: () => import('./pages/request/request.module').then(m => m.RequestModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
