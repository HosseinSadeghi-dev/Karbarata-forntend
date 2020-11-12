import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '@app/core/services';
import {Helpers} from '@app/shared/helpers';

import {
  GalleryPhotoContext,
  NewsCategoryContext,
  NewsStatus
} from '@app/core/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public readonly helper = new Helpers();
  public isEdit: boolean = false;
  public cats: NewsCategoryContext[] = [];
  previewUrl:string = null;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.slug) {
      this.isEdit = true;
      this.newsService.findOneNews(params.slug).subscribe(res => this.handleResById(res));
    }
    this.stFormGroup = this.formBuilder.group({
      image: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      categories: [[], [Validators.required,Validators.minLength(1)]],
      tagList: [[], [Validators.required,Validators.minLength(1)]],
      status: [{value: '', disabled: false}],
      readingTime: ['', Validators.required]
    });
    this.newsService.findAllNewsCategory().subscribe(
      res=> this.handleResCategoryList(res),
      err => this.handleErrCategoryList(err)
    )
  }
  handleResById(res){
    // let categories = [];
    // res.categories.forEach((element)=>{
    //   categories.push(element.slug);
    // });
    this.stFormGroup.get('title').setValue(res.title);
    this.stFormGroup.get('description').setValue(res.description);
    this.stFormGroup.get('content').setValue(res.content);
    this.stFormGroup.get('tagList').setValue(res.tagList);
    this.stFormGroup.get('readingTime').setValue(res.readingTime);
    this.stFormGroup.get('categories').setValue(this.helper.arrayToString(res.categories,'slug'));
    res.status == NewsStatus.PUBLISHED ? this.stFormGroup.get('status').setValue(true) : this.stFormGroup.get('status').setValue(false);
    this.onChangeImage(res.image);
  }
  handleResCategoryList(res){
    this.cats = res;
  }
  handleErrCategoryList(err){
  }
  onSubmit(){
    const form = this.stFormGroup.value;
    form.status = form.status ? NewsStatus.PUBLISHED : NewsStatus.UNPUBLISHED;
    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.newsService.updateNews(params.slug,form).subscribe(res => this.handleRes(res))
    }else {
      this.newsService.saveNews(form).subscribe(res => this.handleRes(res))
    }
  }
  handleRes(res){
    this.router.navigateByUrl('/admin/news');
  }

  onChangeImage(photo: GalleryPhotoContext){
    this.stFormGroup.get('image.id').setValue(photo.id);
    this.stFormGroup.get('image.name').setValue(photo.name);
    this.previewUrl = `https://end.ratabit.com/api/upload/gallery/${photo.name}`;
  }
}
