import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MasterSkillContext} from '@app/core/models';
import {WorkforceService} from '@app/core/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  skills: MasterSkillContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','name','tag','image','svg','categories','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private workforceService: WorkforceService) {}

  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.workforceService.findAllMasterSkill().subscribe(
      res=> this.handleRes(res)
    )
  }
  handleRes(res){
    this.skills = res;
    this.dataSource = new MatTableDataSource<MasterSkillContext>(this.skills);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

}
