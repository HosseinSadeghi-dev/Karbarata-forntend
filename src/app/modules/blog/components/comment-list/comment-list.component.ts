import {Component, Input, OnInit} from '@angular/core';
import {ArticleCommentContext} from '../../../../core/models';
import {UserRole} from '../../../../core/models';
import {Helpers} from '../../../../shared/helpers';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() comments: ArticleCommentContext[];

  public readonly helper = new Helpers();

  constructor() { }

  ngOnInit(): void {
  }

  public get UserRole(){
    return UserRole;
  }
}
