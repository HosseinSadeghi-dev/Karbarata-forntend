import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticleCategoryContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ArticleService} from '@app/core/services';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public data : ArticleCategoryContext[] = [];
  public message: string;

  dataSource = null;
  displayedColumns: string[] = ['count','name','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.articleService.getArticleCategoryList().subscribe(res=> this.handleRes(res))
  }
  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<ArticleCategoryContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
  delete(slug){
    this.articleService.deleteArticleCategory(slug).subscribe(res => this.getList())
  }
}
