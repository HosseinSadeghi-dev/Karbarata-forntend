import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BeforeLoginService} from '@app/core/authentication/before-login.service';
import {RoutingGuard} from '@app/core/authentication/routing.guard';
import {UserRole} from '@app/core/models';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/authentication/user/user.module').then(m => m.UserModule),
    canActivate: [BeforeLoginService]
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoutingGuard],
    data: {
      roles: [UserRole.ADMIN]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
