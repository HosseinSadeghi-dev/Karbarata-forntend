import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Params} from '@angular/router';
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {fromEvent, merge} from 'rxjs';
import {ArticleService} from '@app/core/services';
import {Helpers} from '@app/shared/helpers';
import {ArticlesDataSource} from "@app/modules/admin/pages/article/services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public readonly helper = new Helpers();

  routeParams: Params;
  dataSource: ArticlesDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;


  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.params
    console.log('params',this.routeParams)
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

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadArticlesPage())
      )
      .subscribe();
  }
  loadArticlesPage() {
    this.dataSource.loadArticles(
      this.input.nativeElement.value,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

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
