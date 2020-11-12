import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArticleCommentContext} from '@app/core/models';
import {ArticleService} from '@app/core/services';
import {Helpers} from '@app/shared/helpers';

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.scss']
})
export class ReplyDialogComponent implements OnInit {
  public readonly helper = new Helpers();

  constructor(public dialogRef: MatDialogRef<ReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public comment: ArticleCommentContext,
              private articleService: ArticleService) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  handleRes(res){
    // this.app.handleResponse(res.message);
    this.dialogRef.close(true);
  }


}
