import { Component, OnInit } from '@angular/core';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {UserRole} from '@app/core/models';

export interface navItem {
  title: string,
  url: string,
  icon: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: navItem[] = [];
  constructor(public credentialsService: CredentialsService) { }

  ngOnInit(): void {
    this.data = this.getNavData();
  }
  getNavData(){
    return [
      {
        title: 'پروفایل',
        url: '/user',
        icon: 'account_box'
      },
      // {
      //   title: 'مقالات مورد علاقه',
      //   url: '/user/favorite/article',
      //   icon: 'description'
      // },
      {
        title: 'لیست درخواست ها',
        url: '/user/inbox',
        icon: 'inbox'
      }
    ]
  }

  public get UserRole(){
    return UserRole;
  }
}
