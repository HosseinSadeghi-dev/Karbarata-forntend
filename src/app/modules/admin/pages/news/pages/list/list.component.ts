import {Component, OnInit, ViewChild} from '@angular/core';
import {NewsContext, NewsStatus, ProfileContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {NewsService} from '@app/core/services';
import {MatTableDataSource} from '@angular/material/table';
import {Helpers} from '@app/shared/helpers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public readonly helper = new Helpers();
  data : NewsContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','author','title','image','tagList','favoriteCount','categories','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    public dialog: MatDialog,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.newsService.findAllNews().subscribe(res=> this.handleRes(res))
  }
  handleRes(res){
    console.log(res);
    this.data = res;
    this.dataSource = new MatTableDataSource<NewsContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
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
