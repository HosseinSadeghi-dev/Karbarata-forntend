import {Component, OnInit, ViewChild} from '@angular/core';
import {ConstructSkillContext} from "@app/core/models";
import {MatPaginator} from "@angular/material/paginator";
import {ConstructService} from "@app/core/services";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {TagDialogComponent} from "@app/shared/components/global/tag-dialog/tag-dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  skills: ConstructSkillContext[] = [];
  dataSource = null;
  displayedColumns: string[] = ['count','name','tagList','image','svg','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    public dialog: MatDialog,
    private constructService: ConstructService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.constructService.findAllConstructSkill().subscribe(
      res=> this.handleRes(res)
    )
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

  handleRes(res){
    this.skills = res;
    this.dataSource = new MatTableDataSource<ConstructSkillContext>(this.skills);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

}
