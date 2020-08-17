import { Component, OnInit } from '@angular/core';
import {ArticleCategoryContext, ArticleStatus, GalleryPhotoContext} from '@app/core/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '@app/core/services';
import {Helpers} from "@app/shared/helpers";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public readonly helper = new Helpers();
  public isEdit: boolean = false;
  public cats: ArticleCategoryContext[] = [];
  previewUrl:string = null;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.slug) {
      this.isEdit = true;
      this.articleService.getArticleBySlug(params.slug).subscribe(res => this.handleResById(res));
    }
    this.stFormGroup = this.formBuilder.group({
      image: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      categories: [[], [Validators.required,Validators.minLength(1)]],
      tagList: [[], [Validators.required,Validators.minLength(1)]],
      status: [{value: '', disabled: false}]
    });
    this.articleService.getArticleCategoryList().subscribe(
      res => this.handleResCategoryList(res),
      err => this.handleErrCategoryList(err)
    )
  }
  handleResById(res){
    this.stFormGroup.get('title').setValue(res.title);
    this.stFormGroup.get('description').setValue(res.description);
    this.stFormGroup.get('body').setValue(res.body);
    this.stFormGroup.get('tagList').setValue(res.tagList);
    this.stFormGroup.get('categories').setValue(this.helper.arrayToString(res.categories, 'slug'));
    res.status == ArticleStatus.PUBLISHED ? this.stFormGroup.get('status').setValue(true) : this.stFormGroup.get('status').setValue(false);
    this.onChangeImage(res.image);
  }
  handleResCategoryList(res){
    this.cats = res;
  }
  handleErrCategoryList(err){
    console.log(err);
  }
  onSubmit(){
    const form = this.stFormGroup.value;
    form.status = form.status ? ArticleStatus.PUBLISHED : ArticleStatus.UNPUBLISHED;
    console.log(form);
    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.articleService.updateArticle(params.slug,form).subscribe(res => this.handleRes(res))
    }else {
      this.articleService.saveArticle(form).subscribe(res => this.handleRes(res) )
    }
  }
  handleRes(res){
    this.router.navigateByUrl('/admin/article');
  }

  onChangeImage(photo: GalleryPhotoContext){
    this.stFormGroup.get('image.id').setValue(photo.id);
    this.stFormGroup.get('image.name').setValue(photo.name);
    this.previewUrl = `https://end.ratabit.com/api/upload/gallery/${photo.name}`;
  }
}
