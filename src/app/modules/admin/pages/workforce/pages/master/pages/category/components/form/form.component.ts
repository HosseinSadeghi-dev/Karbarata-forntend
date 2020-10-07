import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {GalleryPhotoContext} from '@app/core/models';
import {WorkforceService} from '@app/core/services';
import {Location} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  // @ViewChildren(ResetParamsDirective) reset: QueryList<ResetParamsDirective>;
  @Output() private categoryUpdated = new EventEmitter();

  isEdit: boolean = false;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private workforceService: WorkforceService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.slug){
        this.isEdit = true;
        this.workforceService.findOneMasterCategory(params.slug).
        subscribe(res => this.handleResBySlug(res));
      }
    });
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
      description: ['', Validators.required]
    });
  }
  handleResBySlug(res){
    this.stFormGroup.get('name').setValue(res.name);
    this.stFormGroup.get('description').setValue(res.description);
    this.onChangeImage(res.image,'image');
    this.onChangeImage(res.svg,'svg');
  }
  onChangeImage(photo: GalleryPhotoContext, prefix){
    this.stFormGroup.get(`${prefix}.id`).setValue(photo.id);
    this.stFormGroup.get(`${prefix}.name`).setValue(photo.name);
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.workforceService.updateMasterCategory(params.slug,form).
      subscribe(res => this.handleResSubmit())
    }else {
      this.workforceService.saveMasterCategory(form).
      subscribe(res => this.handleResSubmit())
    }
  }
  handleResSubmit(){
    this.isEdit = false;
    this.onReset();
    this.categoryUpdated.emit(true);
    this.location.back();
  }
  onReset(){
    this.isEdit = false;
    this.stFormGroup.reset();
  }
}
