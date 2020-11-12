import {Component, Input, OnInit} from '@angular/core';
import {ProfileContext, UserRole} from '@app/core/models';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss']
})
export class UserButtonComponent implements OnInit {
  @Input() user: ProfileContext;
  @Input() url : string;

  constructor() { }

  ngOnInit(): void {
  }
  public get UserRole(){
    return UserRole;
  }
}
