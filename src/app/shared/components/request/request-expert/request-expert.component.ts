import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileContext, UserRole} from "@app/core/models";
import {RequestService} from "@app/core/services";

@Component({
  selector: 'app-request-expert',
  templateUrl: './request-expert.component.html',
  styleUrls: ['./request-expert.component.scss']
})
export class RequestExpertComponent implements OnInit {

  data: ProfileContext;
  isView: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.findOneRequestExpert(params.id).subscribe(
        res => this.handleRes(res),
      )
    }
  }

  onSubmit(res){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.requestService.saveRequestExpert(params.id,{user: res.id}).subscribe(
        res => this.router.navigateByUrl(`/admin/request/simple/${params.id}`)
      )
    }
  }

  handleRes(res){
    this.data = res;
    if (this.data)
      this.isView = !this.isView;
  }

  handleResSubmit(){
    this.ngOnInit();
  }

  public get UserRole() {
    return UserRole;
  }

}
