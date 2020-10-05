import { Component, OnInit } from '@angular/core';
import {FaqService} from "@app/core/services";
import {FaqCategoryContext} from "@app/core/models";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  categories: FaqCategoryContext[] = [];

  constructor(
    private faqService:FaqService
  ) { }

  ngOnInit() {
    this.faqService.findAllFaqCategory('','asc').subscribe(
      res=> this.categories = res.results
    );
  }

}
