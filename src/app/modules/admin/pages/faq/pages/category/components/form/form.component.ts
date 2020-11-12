import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FaqService} from '@app/core/services';
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
    private faqService: FaqService,
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
        this.faqService.
        findOneFaqCategory(params.slug).
        subscribe(res => this.handleResBySlug(res));
      }
    });
  }

  handleResBySlug(res){this.stFormGroup.get('name').setValue(res.name)}

  onSubmit(){
    const params = this.activatedRoute.snapshot.params,
      form = this.stFormGroup.value;
    if (this.isEdit){
      this.faqService.
      updateFaqCategory(params.slug, form).
      subscribe(res => this.handleResSubmit())
    }else {
      this.faqService.
      saveFaqCategory(form).
      subscribe(res => this.handleResSubmit())
    }
  }

  handleResSubmit(){
    this.isEdit = false;
    this.onReset();
    this.categoryUpdated.emit(true);
  }

  onReset(){
    this.isEdit = false;
    this.stFormGroup.reset();
    this.router.navigateByUrl('/admin/faq/category');
  }

}
