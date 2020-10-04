import { Component, OnInit } from '@angular/core';
import {ConstructService} from "@app/core/services";
import {ConstructSkillContext} from "@app/core/models";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  data: ConstructSkillContext[] =[];

  constructor(
    private constructService: ConstructService
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.constructService.findAllConstructSkill().subscribe(
      res => this.data = res
    )
  }

}
