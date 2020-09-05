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
  RequestStatusComponent,
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
                      // {
                      //   path: 'report',
                      //   component: RequestReportListComponent
                      // },
                      // {
                      //   path: 'statusPerDay',
                      //   component: RequestStatusPerDayFormComponent
                      // },
                      // {
                      //   path: 'statusStatement',
                      //   children: [
                      //     {
                      //       path: ':sid',
                      //       component: RequestStatusStatementFormComponent
                      //     },
                      //     {
                      //       path: '',
                      //       component: RequestStatusStatementListComponent
                      //     },
                      //     {
                      //       path: 'create',
                      //       component: RequestStatusStatementFormComponent
                      //     }
                      //   ]
                      // },
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
