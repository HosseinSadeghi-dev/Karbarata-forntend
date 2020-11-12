import { Component, OnInit } from '@angular/core';
import {ArticleCategoryContext} from '@app/core/models';
import {ArticleService} from '@app/core/services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  categories: ArticleCategoryContext[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleService.getArticleCategoryList().subscribe(
      res => this.handleResCategoryList(res.results)
    )
  }

  handleResCategoryList(res){
    this.categories = res;
  }

  onRouter(slug?){
   slug? this.router.navigate(['blog',slug,'category']) : this.router.navigate(['blog'])
  }
}
