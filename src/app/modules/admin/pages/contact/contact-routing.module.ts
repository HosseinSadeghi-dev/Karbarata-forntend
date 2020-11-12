import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'complain',
    loadChildren: () => import('./pages/complain/complain.module').then(m => m.ComplainModule)
  },
  {
    path: 'contactUs',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'cooperation',
    loadChildren: () => import('./pages/cooperation/cooperation.module').then(m => m.CooperationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
