import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BeforeLoginService} from '@app/core/authentication/before-login.service';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/authentication/user/user.module').then(m => m.UserModule),
    canActivate: [BeforeLoginService]
  },
  { path: '', loadChildren: () => import('./modules/layout.module').then(m => m.LayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
