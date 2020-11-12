import {Component, Input, OnInit} from '@angular/core';
import {ProfileContext, UserRole} from '@app/core/models';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user: ProfileContext;
  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
  }

  public get UserRole(){
    return UserRole;
  }
}
