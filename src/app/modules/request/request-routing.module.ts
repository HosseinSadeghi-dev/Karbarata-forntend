import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MainComponent,
  SimpleComponent,
  MunicipalityComponent,
  PriceAdviceComponent
} from "./pages";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'request',
    pathMatch: 'full'
  },
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
        loadChildren: () => import('./pages/master/master.module').then(m => m.MasterModule)
      },
      {
        path: 'construct',
        loadChildren: () => import('./pages/construct/construct.module').then(m => m.ConstructModule)
      },
      {
        path: 'municipality',
        component: MunicipalityComponent
      },
      {
        path: 'price-advice',
        component: PriceAdviceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
