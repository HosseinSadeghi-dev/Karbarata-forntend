import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FaqService} from "@app/core/services";
import {FaqCategoryContext} from "@app/core/models";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() private listUpdater = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  data: FaqCategoryContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','question','categories','created','id'];

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.faqService.findAllFaq().
    subscribe(res => this.handleRes(res))
  }

  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<FaqCategoryContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  onDelete(slug){
    this.faqService.deleteFaq(slug).
    subscribe(res => this.getList())
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
