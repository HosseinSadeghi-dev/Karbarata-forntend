import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },

    ]
  },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
