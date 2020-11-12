import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'master',
        loadChildren: () => import('./pages/master/master.module').then(m => m.MasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkforceRoutingModule { }
