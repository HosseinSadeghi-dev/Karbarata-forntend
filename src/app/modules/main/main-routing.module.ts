import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  DownloadComponent,
  HomeComponent
} from './pages';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'download',
    component: DownloadComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
