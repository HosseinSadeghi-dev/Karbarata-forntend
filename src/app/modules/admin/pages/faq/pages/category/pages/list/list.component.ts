import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {FaqService} from "@app/core/services";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {FaqCategoryContext} from '@app/core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public data: FaqCategoryContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count', 'name', 'id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private faqService: FaqService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.faqService.findAllFaqCategory().
    subscribe(res => this.handleRes(res))
  }

  delete(slug) {
    this.faqService.deleteFaqCategory(slug).
    subscribe(res => this.getList())
  }

  handleRes(res) {
    this.data = res;
    this.dataSource = new MatTableDataSource<FaqCategoryContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

}
