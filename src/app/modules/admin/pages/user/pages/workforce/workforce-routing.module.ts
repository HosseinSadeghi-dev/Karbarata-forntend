import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'master',
    loadChildren: () => import('./pages/master/master.module').then(m => m.MasterModule)
  },
  {
    path: 'simple',
    loadChildren: () => import('./pages/simple/simple.module').then(m => m.SimpleModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkforceRoutingModule { }
