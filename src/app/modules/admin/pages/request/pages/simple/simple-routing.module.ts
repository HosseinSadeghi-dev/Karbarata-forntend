import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  FormComponent,
  ListComponent,
  MainComponent,
  ShowComponent
} from "./pages";

import {
  RequestCostComponent,
  RequestWorkforceComponent
} from "./containers";

import {
  RequestContractorComponent,
  RequestExpertComponent,
  RequestInvoiceComponent,
  RequestInvoiceFormComponent,
  RequestReportComponent,
  RequestStatementComponent,
  RequestStatementFormComponent,
  RequestStatusComponent,
  RequestStatusPerDayComponent,
} from "@app/shared/components";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/request/simple',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'create',
        component: FormComponent
      },
      {
        path: 'edit/:id',
        component: FormComponent
      },
      {
        path: ':id',
        children:[
          {
            path: '',
            children: [

              {
                path: '',
                component: ShowComponent,
                children: [
                  {
                    path: '',
                    children: [
                      {
                        path: '',
                        component: RequestStatusComponent
                      },
                      {
                        path: 'expert',
                        component: RequestExpertComponent
                      },
                      {
                        path: 'cost',
                        component: RequestCostComponent
                      },
                      {
                        path: 'contractor',
                        component: RequestContractorComponent
                      },
                      {
                        path: 'workforce',
                        component: RequestWorkforceComponent
                      },
                      {
                        path: 'report',
                        component: RequestReportComponent
                      },
                      {
                        path: 'statusPerDay',
                        component: RequestStatusPerDayComponent,
                      },
                      {
                        path: 'statusStatement',
                        children: [
                          {
                            path: '',
                            component: RequestStatementComponent
                          },
                          {
                            path: 'create',
                            component: RequestStatementFormComponent
                          },
                          {
                            path: ':sid',
                            component: RequestStatementFormComponent
                          },
                        ]
                      },
                      {
                        path: 'invoice',
                        children: [
                          {
                            path: '',
                            component: RequestInvoiceComponent
                          },
                          {
                            path: 'create',
                            component: RequestInvoiceFormComponent
                          },
                          {
                            path: ':sid',
                            component: RequestInvoiceFormComponent
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleRoutingModule { }
