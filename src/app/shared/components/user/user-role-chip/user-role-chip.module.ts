import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoleChipComponent} from './user-role-chip.component';
import {SharedModule} from '../../../shared.module';



@NgModule({
  declarations: [UserRoleChipComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [UserRoleChipComponent]
})
export class UserRoleChipModule { }
