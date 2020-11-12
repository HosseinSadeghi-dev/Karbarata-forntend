import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  FormComponent,
  ListComponent,
  MainComponent
} from "./pages";

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'',
        component:ListComponent
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'create',
        component: FormComponent,
        data: {
          breadcrumb: 'سئوال جدید'
        }
      },
      {
        path: ':slug',
        component: FormComponent,
        data: {
          breadcrumb: 'ویرایش سئوال'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
