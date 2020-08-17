import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NewsCategoryContext} from '@app/core/models/_news.model';
import {NewsService} from '@app/core/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public data : NewsCategoryContext[] = [];
  public message: string;

  dataSource = null;
  displayedColumns: string[] = ['count','name','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.newsService.findAllNewsCategory().subscribe(res=> this.handleRes(res))
  }
  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<NewsCategoryContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
  delete(slug){
    this.newsService.deleteNewsCategory(slug).subscribe(res => this.getList())
  }
}
