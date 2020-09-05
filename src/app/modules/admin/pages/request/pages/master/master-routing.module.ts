import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  FormComponent,
  ListComponent,
  MainComponent,
  ShowComponent
} from "./pages";

import {
  RequestContractorComponent,
  RequestExpertComponent,
  RequestReportComponent,
  RequestStatementComponent,
  RequestStatementFormComponent,
  RequestStatusComponent,
  RequestStatusPerDayComponent,
  RequestWorkforceComponent
} from "@app/shared/components/request";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/request/master',
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
                        component: RequestStatusPerDayComponent
                      },
                      {
                        path: 'statusStatement',
                        children: [
                          {
                            path: ':sid',
                            component: RequestStatementComponent
                          },
                          {
                            path: '',
                            component: RequestStatementFormComponent
                          },
                          {
                            path: 'create',
                            component: RequestStatementComponent
                          }
                        ]
                      },
                      // {
                      //   path: 'invoice',
                      //   children: [
                      //     {
                      //       path: ':sid',
                      //       component: RequestInvoiceFormComponent
                      //     },
                      //     {
                      //       path: '',
                      //       component: RequestInvoiceComponent
                      //     },
                      //     {
                      //       path: 'create',
                      //       component: RequestInvoiceFormComponent
                      //     }
                      //   ]
                      // }
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
export class MasterRoutingModule { }
