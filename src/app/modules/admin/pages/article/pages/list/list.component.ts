import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticleContext, ArticleStatus, ProfileContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleService, NotificationService} from '@app/core/services';
import {MatDialog} from '@angular/material/dialog';

import {
  FavoriteListDialogComponent,
  TagListDialogComponent
} from '../../components';

import {ArticlesDataSource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  data : ArticleContext[] = [];
  dataSource: ArticlesDataSource;
  displayedColumns: string[] = ['count','author','title','image','tagList','favoriteCount','categories','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    public dialog: MatDialog,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
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

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadArticlesPage())
      )
      .subscribe();
  }
  loadArticlesPage() {
    this.dataSource.loadArticles(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new ArticlesDataSource(this.articleService);
    this.dataSource.loadArticles('', 'asc', 1, 3);
  }

  delete(id){
    this.articleService.deleteArticle(id).subscribe(res => this.getList())
  }

  openTagDialog(tags: string[]){
    this.dialog.open(TagListDialogComponent, {
      width: '350px',
      data: tags
    });
  }

  openFavoriteDialog(favorites: ProfileContext[]){
    this.dialog.open(FavoriteListDialogComponent, {
      width: '350px',
      data: favorites
    });
  }

  onChangeStatus(slug: string, status: ArticleStatus){
    const request = { status: null };
    status === ArticleStatus.PUBLISHED ? request.status = ArticleStatus.UNPUBLISHED : request.status = ArticleStatus.PUBLISHED;
    this.articleService.updateArticleStatus(slug,request).subscribe(res =>  this.getList())
  }

  public get ArticleStatus() {
    return ArticleStatus;
  }
}
