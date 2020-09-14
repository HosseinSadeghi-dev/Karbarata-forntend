import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MainComponent,
  SimpleComponent,
  MasterComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: 'simple',
        component: SimpleComponent
      },
      {
        path: 'master',
        component: MasterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
