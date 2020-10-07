import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {FaqService} from "@app/core/services";
import {FaqCategoryContext} from "@app/core/models";
import {FaqDatasource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  @Output() private listUpdater = new EventEmitter();

  data: FaqCategoryContext[] = [];
  dataSource : FaqDatasource;
  displayedColumns: string[] = ['count','question','categories','created','id'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
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
          this.loadFaqPages();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadFaqPages())
      )
      .subscribe();
  }

  loadFaqPages() {
    this.dataSource.loadFaqs(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new FaqDatasource(this.faqService);
    this.dataSource.loadFaqs('', 'asc', 0, 5);
    console.log('data',this.dataSource)
  }

  onDelete(slug){
    this.faqService.deleteFaq(slug).
    subscribe(res => this.getList())
  }
}
