import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService} from "@app/core/services";
import {Router} from "@angular/router";
import {SkillChooseComponent} from "@app/shared/components/form-fields/skill-choose/skill-choose.component";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  stFormGroup: FormGroup;
  rating: number;

  constructor(
    private formBuilder:FormBuilder,
    private userRequestService: UserRequestService,
    private router: Router,
    private dialogRef: MatDialogRef<SkillChooseComponent>
  ) { }

  ngOnInit() {
    this.stFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      description: ['',Validators.required],
      score: ['']
    })
  }

  onSubmit(){
    const form = this.stFormGroup.value
    form.score = this.rating
    this.userRequestService.requestComplain(form).subscribe(
      () => this.onNoClick()
    );
  }

   onNoClick(){
    this.dialogRef.close();
  }

  ratingComponentClick(clickObj: any): void {
    this.rating = clickObj.rating
    }

}



