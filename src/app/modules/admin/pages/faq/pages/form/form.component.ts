import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FaqCategoryContext} from "@app/core/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FaqService, AppService} from "@app/core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {Helpers} from "@app/shared/helpers";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  public readonly helper = new Helpers();
  isEdit: boolean = false;
  cats: FaqCategoryContext[] = [];
  stFormGroup: FormGroup;


  constructor(
    private faqService: FaqService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.slug) {
      this.isEdit = true;
      this.faqService.findOneFaq(params.slug).subscribe(
        res => this.handleResById(res)
      );
    }
    this.stFormGroup = this.formBuilder.group({
      question: ['', [Validators.required,Validators.maxLength(191)]],
      answer: ['', Validators.required],
      categories: [[], [Validators.required,Validators.minLength(1)]]
    });
    this.faqService.findAllFaqCategory().
    subscribe(res=> this.cats = res)
  }

  handleResById(res){
    this.stFormGroup.get('question').setValue(res.question);
    this.stFormGroup.get('answer').setValue(res.answer);
    this.stFormGroup.get('categories').setValue(this.helper.arrayToString(res.categories, 'slug'));
  }

  onSubmit(){
    const form = this.stFormGroup.value;
    if (this.isEdit){
      const params = this.activatedRoute.snapshot.params;
      this.faqService.updateFaq(params.slug,form).
      subscribe(res => this.handleRes())
    }else {
      this.faqService.saveFaq(form).
      subscribe(res => this.handleRes())
    }
  }
  handleRes(){
    this.router.navigateByUrl('/admin/faq');
  }

}
