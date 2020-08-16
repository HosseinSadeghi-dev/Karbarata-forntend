import { Component, OnInit, ViewChild} from '@angular/core';
import {ArticleContext, ArticleStatus, ProfileContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleService, NotificationService} from '@app/core/services';
import {MatDialog} from '@angular/material/dialog';

import {
  FavoriteListDialogComponent,
  TagListDialogComponent
} from '../../components';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data : ArticleContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','author','title','image','tagList','favoriteCount','categories','status','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    public dialog: MatDialog,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.articleService.getArticleList().subscribe(res=> this.handleRes(res))
  }
  handleRes(res){
    this.data = res.articles;
    this.dataSource = new MatTableDataSource<ArticleContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
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
