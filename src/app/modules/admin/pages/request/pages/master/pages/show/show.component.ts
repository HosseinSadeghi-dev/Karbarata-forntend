import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestContext, UserRole} from "../../../../../../../../core/models";
import {RequestService} from "../../../../../../../../core/services";

@Component({
  selector: 'app-main',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  data: RequestContext

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private requestService:RequestService
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.requestService.findOneRequest(params.id).subscribe(
        res => this.data = res,
      );
    }
  }

  navigate(){
    this.router.navigateByUrl(`/admin/request/master/edit/${this.data.id}`);
  }

  public get UserRole() {
    return UserRole;
  }

  links = [
    { path: '.', label: 'وضعیت'},
    { path: 'expert', label: 'کارشناس'},
    // { path: 'cost', label: 'هزینه'},
    { path: 'statusPerDay', label: 'زمانبندی صورت وضعیت'},
    { path: 'contractor', label: 'پیمانکار'},
    { path: 'workforce', label: 'نیرو'},
    { path: 'report', label: 'گزارش'},
    { path: 'statusStatement', label: 'صورت وضعیت'},
    { path: 'invoice', label: 'صورت حساب'}
  ];

}
