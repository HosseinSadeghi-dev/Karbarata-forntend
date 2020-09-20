import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-status-per-day',
  templateUrl: './request-status-per-day.component.html',
  styleUrls: ['./request-status-per-day.component.scss']
})
export class RequestStatusPerDayComponent implements OnInit {

  type: any;
  stFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.type = this.activatedRoute.data;

    this.stFormGroup = this.formBuilder.group({
      statusPerDay: ['',Validators.required]
    });

    this.getRequest();
  }

  getRequest(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.requestService.findOneRequest(params.id).subscribe(
        res => this.handleRes(res)
      );
    }
  }

  onSubmit(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      const form = this.stFormGroup.value;
      this.requestService.saveRequestPerDayStatus(params.id, form).subscribe(
        res => {
          if (this.type.value.type === 'master')
            this.router.navigateByUrl(`/admin/request/master/${params.id}/statusPerDay`)
          else
            this.router.navigateByUrl(`/admin/request/simple/${params.id}/statusPerDay`)
        }
      )
    }
  }

  handleRes(res){
    this.stFormGroup.get('statusPerDay').setValue(res.statusPerDay);
    if (this.stFormGroup.get('statusPerDay').value > 0){
      this.stFormGroup.disable();
    }
  }

}
