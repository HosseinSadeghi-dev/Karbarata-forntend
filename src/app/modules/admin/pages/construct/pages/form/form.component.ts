import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConstructService} from "@app/core/services";
import {Helpers} from "@app/shared/helpers";
import {GalleryPhotoContext} from "@app/core/models";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public readonly helper = new Helpers();
  stFormGroup: FormGroup;
  isEdit: boolean = false;

  constructor(
    private constructService: ConstructService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;

    if (params.slug){
      this.isEdit = true;
      this.constructService.findOneConstructSkill(params.slug).subscribe(
        res => this.handleRes(res)
      );
    }

    this.stFormGroup = this.formBuilder.group({
      image: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      svg: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      }),
      body: ['',Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      tagList: [[], [Validators.required,Validators.minLength(1)]],
    });
  }

  handleRes(res){
    this.stFormGroup.get('name').setValue(res.name);
    this.stFormGroup.get('description').setValue(res.description);
    this.stFormGroup.get('body').setValue(res.body);
    this.onChangeImage(res.image, 'image');
    this.onChangeImage(res.svg, 'svg');
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
      this.constructService
        .updateConstructSkill(params.slug,form)
        .subscribe(() => this.router.navigateByUrl('/admin/construct') )
    }else {
      this.constructService
        .saveConstructSkill(form)
        .subscribe(() => this.router.navigateByUrl('/admin/construct') )
    }
  }

}
