import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRequestService, WorkforceService} from "@app/core/services";
import {MatStepper} from "@angular/material/stepper";
import {ActivatedRoute, Router} from "@angular/router";
import {MasterSkillContext, RequestMasterContext} from "@app/core/models";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  skills: MasterSkillContext[] =[];
  todayDate = new Date();
  minDate = new Date();
  stepIndex: number = 0;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestService,
    private activatedRoute: ActivatedRoute,
    private workforceService: WorkforceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.minDate = new Date(this.todayDate.setDate(this.todayDate.getDate() + 1));

    const params = this.activatedRoute.snapshot.params

    this.workforceService.findOneMasterSkill(params.skill).subscribe(
      res => this.handleResData(res)
    )

    this.stFormGroup = this.formBuilder.group({

      typeForm: this.formBuilder.group({
        skills: [[]]
      }),

      locationForm: this.formBuilder.group({
        approximateArea: ['', Validators.required],
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
      }),

      confirmForm: this.formBuilder.group({
        description: [''],
        isForce: [false],
        serviceDate: ['']
      })

    })
  }

  onSubmit(){
   this.stFormGroup.controls['typeForm'].get('skills').setValue(this.skills)
    let skills = [];
    this.stFormGroup.controls['typeForm'].get('skills').value.forEach(
      row => skills.push(row.slug)
    )

    const form: RequestMasterContext = {
     skills : skills,
      request: {
       description: this.stFormGroup.controls['confirmForm'].get('description').value,
       isForce: this.stFormGroup.controls['confirmForm'].get('isForce').value,
       serviceDate: this.stFormGroup.controls['confirmForm'].get('serviceDate').value,
        approximateArea: this.stFormGroup.controls['locationForm'].get('approximateArea').value,
        address: this.stFormGroup.controls['locationForm'].get('address').value,
        houseNumber: this.stFormGroup.controls['locationForm'].get('houseNumber').value,
      }

    }

    this.userRequestService.requestMaster(form).subscribe(
      () => this.router.navigateByUrl('user/inbox')
    )

  }

  handleResData(res){
    this.skills.push(res);
  }

  nextStep(stepper: MatStepper){
    stepper.next();
    this.stepIndex = stepper.selectedIndex;
  }
  prevStep(stepper: MatStepper){
    stepper.previous();
    this.stepIndex = stepper.selectedIndex;
  }

}
