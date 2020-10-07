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
  stformGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private userRequestService: UserRequestService,
    private router: Router,
    private dialogRed: MatDialogRef<SkillChooseComponent>
  ) { }

  ngOnInit() {
    this.stformGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      description: ['',Validators.required]
    })
  }

  onSubmit(){
    const form = this.stformGroup.value
    this.userRequestService.requestComplain(form).
    subscribe(res => this.router.navigateByUrl('/complain'));
  }

   onNoClick(){
    this.dialogRed.close()
}
}



