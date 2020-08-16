import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ArticleFavoriteComponent,
  MainComponent,
  ProfileComponent
} from './pages';

import {AuthenticationGuard} from '@app/core/authentication/authentication.guard';
import {RoutingGuard} from '@app/core/authentication/routing.guard';
import {UserRole} from '@app/core/models';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    data: {
      breadcrumb: 'ناحیه کاربری'
    },
    // canActivate: [AfterLoginService],
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate:[RoutingGuard],
        data: { roles: [ UserRole.USER ] }
      },
      {
        path: 'favorite',
        children: [
          {
            path: 'article',
            component: ArticleFavoriteComponent
          }
        ]
      }
      // { path: 'article/', loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
