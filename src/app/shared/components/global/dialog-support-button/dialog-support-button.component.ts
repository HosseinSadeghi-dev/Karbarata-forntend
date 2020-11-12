import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../../../core/services";
import {MatDialogRef} from "@angular/material/dialog";
import {SkillChooseComponent} from "../../form-fields/skill-choose/skill-choose.component";

@Component({
  selector: 'app-dialog-support-button',
  templateUrl: './dialog-support-button.component.html',
  styleUrls: ['./dialog-support-button.component.scss']
})
export class DialogSupportButtonComponent implements OnInit {
  stFormGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private dialogRef: MatDialogRef<SkillChooseComponent>
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      phoneNumber: ['',Validators.required],
      description: ['',Validators.required]
    })
  }

  onSubmit(){
    this.requestService.requestSupport(this.stFormGroup.value).subscribe(
      () => this.onNoClick()
    )
  }

  onNoClick(){
    this.dialogRef.close()
  }

}
