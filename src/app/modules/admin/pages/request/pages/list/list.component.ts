import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {RequestContext, RequestStatusType} from "@app/core/models";
import {RequestService} from "@app/core/services";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: RequestContext[] = [];
  dataSource = null;
  displayedColumns: string[] = [ 'count','number','user','type','status','created','id' ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    console.log('filter',this.dataSource.filter)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private requestService:RequestService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<RequestContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  getList(){
    this.requestService.findAll().subscribe(res => this.handleRes(res))
  }

  delete(id: number){
    this.requestService.deleteRequest(id).subscribe(res => this.getList())
  }

  public get RequestStatus() {
    return RequestStatusType
  }

}
