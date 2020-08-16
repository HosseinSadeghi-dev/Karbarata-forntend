import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleService} from '@app/core/services';
import {ArticleCommentReplyContext} from '@app/core/models';
import {Helpers} from '@app/shared/helpers';
import {NotificationService} from '@app/core/services/_notification.service';

@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.scss']
})
export class ReplyCardComponent implements OnInit {
  @Input() data: ArticleCommentReplyContext;
  @Output() newReply = new EventEmitter();
  public readonly helper = new Helpers();

  constructor(private articleService: ArticleService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {}

  onDelete(id){
    this.articleService.deleteArticleCommentReply(id).subscribe(res => this.handleRes(res));
  }
  handleRes(res){
    this.notificationService.openSnackBar(res.message);
    this.newReply.emit();
  }
}
