import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  FormComponent,
  ListComponent,
  MainComponent,
  ShowComponent
} from "./pages";

import {
  WorkforceMasterComponent
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
                        component: RequestStatusComponent,
                      },
                      {
                        path: 'expert',
                        component: RequestExpertComponent,
                        data:{
                          type:'master'
                        }
                      },
                      {
                        path: 'contractor',
                        component: RequestContractorComponent,
                        data:{
                          type:'master'
                        }
                      },
                      {
                        path: 'workforce',
                        component: WorkforceMasterComponent
                      },
                      {
                        path: 'report',
                        component: RequestReportComponent,
                        data:{
                          type:'master'
                        }
                      },
                      {
                        path: 'statusPerDay',
                        component: RequestStatusPerDayComponent,
                        data:{
                          type:'master'
                        }
                      },
                      {
                        path: 'statusStatement',
                        data:{
                          type:'master'
                        },
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
                        data:{
                          type:'master'
                        },
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
export class MasterRoutingModule { }
