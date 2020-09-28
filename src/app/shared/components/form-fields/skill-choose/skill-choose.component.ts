import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MasterCategoryContext, MasterSkillContext} from "@app/core/models";
import {RequestService, WorkforceService} from "@app/core/services";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";

export interface dialogData{
  selected?: MasterSkillContext[]
}

@Component({
  selector: 'app-skill-choose',
  templateUrl: './skill-choose.component.html',
  styleUrls: ['./skill-choose.component.scss']
})
export class SkillChooseComponent implements OnInit {

  categories: MasterCategoryContext[]= [];
  choosed: MasterSkillContext[]= [];

  stFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SkillChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    private workforceService: WorkforceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.workforceService.findAllMasterCategory().subscribe(
      res => this.categories = res
    )

    this.stFormGroup = this.formBuilder.group({
      choosed: [[],Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
