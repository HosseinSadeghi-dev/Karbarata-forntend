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

  dataSource: ArticlesDataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;


  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
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

    const routeParams = this.activatedRoute.snapshot.params

    if(routeParams.category){
      this.dataSource.loadArticles(
        this.input.nativeElement.value,
        'desc',
        this.paginator.pageIndex,
        this.paginator.pageSize,
        'category',
        routeParams.category
      );
    }
    else if(routeParams.tag){
      this.dataSource.loadArticles(
        this.input.nativeElement.value,
        'desc',
        this.paginator.pageIndex,
        this.paginator.pageSize,
        'author',
        routeParams.tag
      );
    }
    else if(routeParams.author){
      this.dataSource.loadArticles(
        this.input.nativeElement.value,
        'desc',
        this.paginator.pageIndex,
        this.paginator.pageSize,
        'tag',
        routeParams.author
      );
    }
    else{
      this.dataSource.loadArticles(
        this.input.nativeElement.value,
        'desc',
        this.paginator.pageIndex,
        this.paginator.pageSize)
      ;
    }
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new ArticlesDataSource(this.articleService);


    const routeParams = this.activatedRoute.snapshot.params

    if(routeParams.category){
      this.dataSource.loadArticles('', 'desc', 0, 5, 'category',routeParams.category);
    }
    else if(routeParams.tag){
      this.dataSource.loadArticles('', 'desc', 0, 5, 'author',routeParams.tag);
    }
    else if(routeParams.author){
      this.dataSource.loadArticles('', 'desc', 0, 5, 'tag',routeParams.author);
    }
    else{
      this.dataSource.loadArticles('', 'desc', 0, 5);
    }
  }



}
