import { Component, OnInit } from '@angular/core';
import {WorkforceService} from "@app/core/services";
import {MasterCategoryContext} from "@app/core/models";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  data: MasterCategoryContext[] = [];

  constructor(
    private workforceService: WorkforceService
  ) { }

  ngOnInit(): void {
    this.workforceService.findAllMasterCategory().subscribe(
      res => this.getList(res)
    )
  }

  getList(res){
    this.data = res
  }


}
