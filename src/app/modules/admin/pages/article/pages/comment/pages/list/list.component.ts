import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticleCommentContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {ArticleService} from '@app/core/services';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {ReplyDialogComponent} from '../../components';
import {Helpers} from '@app/shared/helpers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public readonly helper = new Helpers();
  public data : ArticleCommentContext[] = [];

  dataSource = null;
  displayedColumns: string[] = ['count','user','body','article','created','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private articleService: ArticleService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.articleService.getArticleCommentList().subscribe(res=> this.handleRes(res))
  }

  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<ArticleCommentContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  openReplyDialog(data){
    const dialogRef = this.dialog.open(ReplyDialogComponent, {
      width: '350px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getList();
      }
    });
  }

  onDelete(id){
    this.articleService.deleteArticleComment(id).subscribe(
      res => this.handleResDelete(res)
    )
  }

  handleResDelete(res){
    // this.app.handleResponse(res.message);
    this.getList();
  }

}
