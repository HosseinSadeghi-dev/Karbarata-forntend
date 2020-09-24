import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleryPhotoContext, MasterCategoryContext} from '@app/core/models';
import {WorkforceService} from '@app/core/services';
import {Helpers} from '@app/shared/helpers';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public readonly helper = new Helpers();
  categories: MasterCategoryContext[] = [];
  isEdit: boolean = false;
  stFormGroup: FormGroup;

  constructor(
    private workforceService: WorkforceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.slug){
      this.isEdit = true;
      this.workforceService
        .findOneMasterSkill(params.slug)
        .subscribe(res => this.handleResBySlug(res));
    }
    this.workforceService
      .findAllMasterCategory()
      .subscribe(res => this.categories = res);
    this.stFormGroup = this.formBuilder.group({
      image: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      svg: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      name: ['', Validators.required],
      description: ['', Validators.required],
      services: [[], [Validators.required,Validators.minLength(1)]],
      tips: [[], [Validators.required,Validators.minLength(1)]],
      notices: [[], [Validators.required,Validators.minLength(1)]],
      tagList: [[], [Validators.required,Validators.minLength(1)]],
      categories: [[], [Validators.required,Validators.minLength(1)]]
    });

  }

  handleResBySlug(res){
    this.stFormGroup.get('name').setValue(res.name);
    this.stFormGroup.get('description').setValue(res.description);
    this.onChangeImage(res.image, 'image');
    this.onChangeImage(res.svg, 'svg');
    this.stFormGroup.get('categories').setValue(this.helper.arrayToString(res.categories, 'slug'));
    this.stFormGroup.get('services').setValue(res.services);
    this.stFormGroup.get('tips').setValue(res.tips);
    this.stFormGroup.get('notices').setValue(res.notices);
    this.stFormGroup.get('tagList').setValue(res.tagList);
  }

  onChangeImage(photo: GalleryPhotoContext, prefix){
    this.stFormGroup.get(`${prefix}.id`).setValue(photo.id);
    this.stFormGroup.get(`${prefix}.name`).setValue(photo.name);
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.workforceService
        .updateMasterSkill(params.slug,form)
        .subscribe(res => this.handleResSubmit())
    }else {
      this.workforceService
        .saveMasterSkill(form)
        .subscribe(res => this.handleResSubmit())
    }
  }

  handleResSubmit(){
    this.isEdit = false;
    this.router.navigateByUrl('/admin/workforce/master/skill');
  }
}
