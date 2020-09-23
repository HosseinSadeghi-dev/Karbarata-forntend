import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  FormComponent,
  ListComponent,
  MainComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/construct',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'create',
        component: FormComponent
      },
      {
        path: ':slug',
        component: FormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructRoutingModule { }
