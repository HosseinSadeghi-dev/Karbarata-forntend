import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '@app/core/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() private categoryUpdated = new EventEmitter();
  isEdit: boolean = false;
  stFormGroup: FormGroup;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(params => {
      if (params.slug){
        this.isEdit = true;
        this.articleService.getArticleCategoryById(params.slug).subscribe(res => this.handleResBySlug(res));
      }
    });
  }

  handleResBySlug(res){this.stFormGroup.get('name').setValue(res.name)}

  onSubmit(){
    const params = this.activatedRoute.snapshot.params,
          form = this.stFormGroup.value;
    if (this.isEdit){
      this.articleService.updateArticleCategory(params.slug, form).subscribe(res => this.handleResSubmit(res))
    }else {
      this.articleService.saveArticleCategory(form).subscribe(res => this.handleResSubmit(res))
    }
  }

  handleResSubmit(res){
    this.isEdit = false;
    this.onReset();
    this.categoryUpdated.emit(true);
  }

  onReset(){
    this.isEdit = false;
    this.stFormGroup.reset();
    this.router.navigateByUrl('/admin/article/category');
  }
}
