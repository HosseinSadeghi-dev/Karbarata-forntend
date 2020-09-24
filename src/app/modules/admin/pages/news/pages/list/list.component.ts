import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsContext, NewsStatus, ProfileContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {NewsService} from '@app/core/services';
import {Helpers} from '@app/shared/helpers';
import {NewsDataSource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  public readonly helper = new Helpers();
  data : NewsContext[] = [];
  dataSource : NewsDataSource;
  displayedColumns: string[] = ['count','author','title','image','tagList','favoriteCount','categories','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  constructor(
    public dialog: MatDialog,
    private newsService: NewsService
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
          this.loadNewsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadNewsPage())
      )
      .subscribe();
  }

  loadNewsPage() {
    this.dataSource.loadNews(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new NewsDataSource(this.newsService);
    this.dataSource.loadNews('', 'asc', 1, 3);
  }

  delete(id){
    this.newsService.deleteNews(id).subscribe(res => this.getList())
  }

  openTagDialog(tags: string[]){
    // this.dialog.open(TagListDialogComponent, {
    //   width: '350px',
    //   data: tags
    // });
  }
  openFavoriteDialog(favorites: ProfileContext[]){
    // this.dialog.open(FavoriteListDialogComponent, {
    //   width: '350px',
    //   data: favorites
    // });
  }
  onChangeStatus(slug: string, status: NewsStatus){
    const request = { status: null };
    status === NewsStatus.PUBLISHED ? request.status = NewsStatus.UNPUBLISHED : request.status = NewsStatus.PUBLISHED;
    this.newsService.updateNewsStatus(slug,request).subscribe(res =>  this.getList())
  }

  public get NewsStatus() {
    return NewsStatus;
  }
}
