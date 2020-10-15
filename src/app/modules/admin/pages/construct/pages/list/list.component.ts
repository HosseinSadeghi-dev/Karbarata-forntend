import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConstructSkillContext} from "@app/core/models";
import {MatPaginator} from "@angular/material/paginator";
import {ConstructService} from "@app/core/services";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {TagDialogComponent} from "@app/shared/components/global/tag-dialog/tag-dialog.component";
import {ConstructDatasource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {fromEvent, merge} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  skills: ConstructSkillContext[] = [];
  dataSource : ConstructDatasource;
  displayedColumns: string[] = ['count','name','tagList','image','svg','id'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    public dialog: MatDialog,
    private constructService: ConstructService
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
          this.loadConstructPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadConstructPage())
      )
      .subscribe();
  }
  loadConstructPage() {
    this.dataSource.loadConstructs(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  getList(){
    this.paginator.firstPage();
    this.dataSource = new ConstructDatasource(this.constructService);
    this.dataSource.loadConstructs('', 'desc', 0, 5);
  }

  openTagDialog(tags: string[]){
    this.dialog.open(TagDialogComponent, {
      width: '350px',
      data: tags
    });
  }

  delete(slug){
    this.constructService.deleteConstructSkill(slug).subscribe(
      () => this.getList()
    )
  }

}
