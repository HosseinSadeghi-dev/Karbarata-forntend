import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MasterCategoryContext} from '@app/core/models';
import {WorkforceService} from '@app/core/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data: MasterCategoryContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','name','image','svg','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private workforceService: WorkforceService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.workforceService.findAllMasterCategory().
    subscribe(res => this.handleRes(res))
  }
  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<MasterCategoryContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
  onDelete(slug: string){
    this.workforceService.deleteMasterCategory(slug).
    subscribe(res => this.getList())
  }
}
