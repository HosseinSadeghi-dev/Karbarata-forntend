import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ArticleService} from '../../../../core/services';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() slug: string;
  @Output() private commentUpdated = new EventEmitter();

  commentFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.commentFormGroup = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  onSubmit(){
    this.articleService.saveArticleComment(this.slug,this.commentFormGroup.value).subscribe(res => this.handleRes(res))

  }
  handleRes(res){
    // this.app.handleResponse(res.message);
    this.commentFormGroup.reset();
    this.commentUpdated.emit(true);
  }

}
