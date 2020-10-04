import { Component, OnInit } from '@angular/core';
import {MasterCategoryContext} from "@app/core/models";
import {RequestService, WorkforceService} from "@app/core/services";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  category: MasterCategoryContext;

  constructor(
    private workforceService: WorkforceService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params

    this.workforceService.findOneMasterCategory(params.slug).subscribe(
      res => this.getCategory(res)
    )
  }

  getCategory(res){
    this.category = res
  }

}
