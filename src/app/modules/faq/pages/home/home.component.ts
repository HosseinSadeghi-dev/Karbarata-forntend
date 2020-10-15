import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FaqDatasource} from "../../../admin/pages/faq/services";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FaqService} from "@app/core/services";
import {FaqContext} from "@app/core/models";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataSource : FaqDatasource;
  displayedColumns: string[] = ['count','question','categories','created','id'];

  faqs: FaqContext[] = [];
  category: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private faqService: FaqService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params.category;
    this.getList();
  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
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

    merge('asc', this.paginator.page)
      .pipe(
        tap(() => this.loadFaqPages())
      )
      .subscribe();
  }

  loadFaqPages() {
    if(this.category){
      this.dataSource.loadFaqs(
        this.input.nativeElement.value,
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize,
        'category',
        this.category);
    } else {
      this.dataSource.loadFaqs(
        this.input.nativeElement.value,
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }

  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new FaqDatasource(this.faqService);
    if(this.category){
      this.dataSource.loadFaqs('', 'asc', 0, 5,'category',this.category);
    }
    else{
      this.dataSource.loadFaqs('', 'desc', 0, 5);
    }
  }

}
