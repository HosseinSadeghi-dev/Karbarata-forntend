import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '@app/core/services';
import {ArticleCommentContext} from '@app/core/models';
import {NotificationService} from '@app/core/services/_notification.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit {
  @Input() comment: ArticleCommentContext;
  @Output() newReply = new EventEmitter();
  replyFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.replyFormGroup = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  onSubmit(){
    this.articleService
      .saveArticleCommentReply(this.comment.id, {body: this.replyFormGroup.get('body').value})
      .subscribe(res => this.handleRes(res))
  }
  handleRes(res){
    this.notificationService.openSnackBar(res.message);
    this.newReply.emit();
  }

}
