import { Component, OnInit } from '@angular/core';
import {FaqContext} from "../../../../core/models";
import {FaqService} from "../../../../core/services";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs: FaqContext[] =[];

  constructor(
    private faqService: FaqService
  ) { }

  ngOnInit(): void {
    this.faqService.findAllFaq('','asc',0,5).subscribe(
      res => this.faqs = res.results
    )
  }

}
