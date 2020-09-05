import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {RequestSimpleContext, RequestStatusType, WorkforceSimpleType} from "@app/core/models";
import {RequestService} from "@app/core/services";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: RequestSimpleContext[] = [];
  dataSource = null;
  displayedColumns: string[] = [ 'count','number','user','quantity','duration','type','status','created','id' ];
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

  getList(){
    this.requestService.findAllSimple().subscribe(res => this.handleRes(res))
  }

  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<RequestSimpleContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  delete(id: number){
    this.requestService.deleteSimpleRequest(id).subscribe(res => this.getList())
  }

  public get RequestSimpleType() {
    return WorkforceSimpleType
  }

  public get RequestStatus() {
    return RequestStatusType;
  }
}
