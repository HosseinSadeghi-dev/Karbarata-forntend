import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticleContext, ArticleStatus} from '../../../../core/models';
import {MatPaginator} from '@angular/material/paginator';
import {fromEvent, merge, Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleService} from '../../../../core/services';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Helpers} from '../../../../shared/helpers';
import {ArticlesDataSource} from "../../../admin/pages/article/services";
import {MatSort} from "@angular/material/sort";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public articles: ArticleContext[] = [];
  public readonly helper = new Helpers();

  obs: Observable<any>;
  routeParams: Params;
  dataSource: ArticlesDataSource;
  // displayedColumns: string[] = ['count','author','title','image','tagList','favoriteCount','categories','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.params
    this.getList();
  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArticlesPage();
        })
      )
      .subscribe();

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     tap(() => this.loadArticlesPage())
    //   )
    //   .subscribe();
  }
  loadArticlesPage() {
    this.dataSource.loadArticles(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  // getArticleList(){
  //   this.activatedRoute.params.subscribe(routeParams => {
  //     if (routeParams.category){
  //       this.articleService.getArticleFilter('category',routeParams.category).subscribe(res => this.handleResList(res));
  //     }else if (routeParams.tag){
  //       this.articleService.getArticleFilter('tag',routeParams.tag).subscribe(res => this.handleResList(res))
  //     }else if(routeParams.author){
  //       this.articleService.getArticleFilter('author',routeParams.author).subscribe(res => this.handleResList(res))
  //     } else {
  //       this.articleService.getArticleList().subscribe(res => this.handleResList(res))
  //     }
  //   });
  // }
  // handleResList(res){
  //   this.articles = res.articles.filter(article => article.status !== ArticleStatus.UNPUBLISHED);
  //   this.dataSource = new MatTableDataSource<ArticleContext>(this.articles);
  //   this.changeDetectorRef.detectChanges();
  //   this.dataSource.paginator = this.paginator;
  //   this.obs = this.dataSource.connect();
  // }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new ArticlesDataSource(this.articleService);

    if(this.routeParams.category){
      this.dataSource.loadArticles('', 'asc', 0, 5, 'category',this.routeParams.category);
    }
    else if(this.routeParams.tag){
      this.dataSource.loadArticles('', 'asc', 0, 5, 'author',this.routeParams.author);
    }
    else if(this.routeParams.author){
      this.dataSource.loadArticles('', 'asc', 0, 5, 'tag',this.routeParams.tag);
    }
    else{
      this.dataSource.loadArticles('', 'asc', 0, 5);
    }
  }

}
