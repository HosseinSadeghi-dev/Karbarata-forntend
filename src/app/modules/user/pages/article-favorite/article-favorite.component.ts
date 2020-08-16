import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ArticleContext, ArticleStatus} from '@app/core/models';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '@app/core/services/_user.service';
import {trigger} from '@angular/animations';
import {fadeIn} from '@app/shared/animations';

@Component({
  selector: 'app-article-favorite',
  templateUrl: './article-favorite.component.html',
  styleUrls: ['./article-favorite.component.scss'],
  animations : [trigger('fadeIn', fadeIn())]
})
export class ArticleFavoriteComponent implements OnInit {

  public articles: ArticleContext[] = [];
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private userService: UserService) {}

  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.userService.getFavoriteArticle().subscribe(res => this.handleResList(res),)
  }
  handleResList(res){
    this.articles = res.filter(article => article.status !== ArticleStatus.UNPUBLISHED);
    this.dataSource = new MatTableDataSource<ArticleContext>(this.articles);
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
  }


}
