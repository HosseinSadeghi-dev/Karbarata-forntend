import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SelectionModel} from "@angular/cdk/collections";
import {RequestStatusStatementContext, StatusStatementType} from "@app/core/models";
import {RequestService} from "@app/core/services";

export interface DialogData {
  request?: number,
  multiple?: boolean,
  selected?: RequestStatusStatementContext[]
}

@Component({
  selector: 'app-request-statement-choose-dialog',
  templateUrl: './request-statement-choose-dialog.component.html',
  styleUrls: ['./request-statement-choose-dialog.component.scss']
})
export class RequestStatementChooseDialogComponent implements OnInit {

  statusStatements: RequestStatusStatementContext[] = [];
  displayedColumns: string[] = ['select', 'id', 'type','user', 'isExpertApproval','created'];
  dataSource = new MatTableDataSource<RequestStatusStatementContext>([]);
  selection = new SelectionModel<RequestStatusStatementContext>(this.data.multiple, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    public dialogRef: MatDialogRef<RequestStatementChooseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private requestService: RequestService
  )
  {
    // if (data.request !== 0) {
    //   this.requestService.getRequestStatusStatementFilter('request',data.request).subscribe(
    //     res => this.handleRes(res)
    //   );
    // }else {
    //   this.requestService.getRequestStatusStatementList().subscribe(
    //     res => this.handleRes(res)
    //   );
    // }
  }

  ngOnInit(): void {
  }

  handleRes(res){
    this.statusStatements = res;
    let selectedStatusStatements: RequestStatusStatementContext[] = [];

    this.data.selected.forEach(row => {
      selectedStatusStatements.push(this.statusStatements.find(i => i.id === row.id));
    });
    this.dataSource = new MatTableDataSource<RequestStatusStatementContext>(this.statusStatements);
    this.selection = new SelectionModel<RequestStatusStatementContext>(this.data.multiple, selectedStatusStatements);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row) {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public get Type(){
    return StatusStatementType;
  }

}
