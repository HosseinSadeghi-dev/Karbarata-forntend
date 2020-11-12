import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestContext, UserRole} from "@app/core/models";
import {RequestService} from "@app/core/services";
import {CredentialsService} from "@app/core/authentication/credentials.service";

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
    private requestService: RequestService,
    public credentialsService: CredentialsService
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
    {
      path: '.',
      label: 'وضعیت',
      allowedRoles: [UserRole.ADMIN, UserRole.EXPERT, UserRole.CONTRACTOR, UserRole.OPERATOR]
    },
    {
      path: 'expert',
      label: 'کارشناس',
      allowedRoles: [UserRole.OPERATOR, UserRole.ADMIN]
    },
    // { path: 'cost', label: 'هزینه'},
    {
      path: 'statusPerDay',
      label: 'زمانبندی صورت وضعیت',
      allowedRoles: [UserRole.ADMIN, UserRole.EXPERT]
    },
    {
      path: 'contractor',
      label: 'پیمانکار',
      allowedRoles: [UserRole.ADMIN, UserRole.EXPERT]
    },
    {
      path: 'workforce',
      label: 'نیرو',
      allowedRoles: [UserRole.ADMIN, UserRole.EXPERT, UserRole.CONTRACTOR]
    },
    {
      path: 'report',
      label: 'گزارش',
      allowedRoles: [UserRole.ADMIN, UserRole.EXPERT, UserRole.CONTRACTOR, UserRole.OPERATOR]
    },
    {
      path: 'statusStatement',
      label: 'صورت وضعیت',
      allowedRoles: [UserRole.ADMIN, UserRole.EXPERT]
    },
    {
      path: 'invoice',
      label: 'صورت حساب',
      allowedRoles: [UserRole.ADMIN, UserRole.ACCOUNTANT]
    }
  ];

}
