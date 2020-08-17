import {Component, Input, OnInit} from '@angular/core';
import {UserRole} from '@app/core/models';

@Component({
  selector: 'app-user-role-chip',
  templateUrl: './user-role-chip.component.html',
  styleUrls: ['./user-role-chip.component.scss']
})
export class UserRoleChipComponent implements OnInit {
  @Input() roles: UserRole[];

  constructor() { }

  ngOnInit(): void {
  }

  public get UserRole(){
    return UserRole;
  }
}
