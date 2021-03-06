import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {RequestStatusStatementItemContext, StatusStatementItemUnit} from "@app/core/models";

@Component({
  selector: 'app-request-status-statement-table',
  templateUrl: './request-status-statement-table.component.html',
  styleUrls: ['./request-status-statement-table.component.scss']
})
export class RequestStatusStatementTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'quantity','unit','cost','costTotal'];

  @ViewChild(MatTable,{static:true}) table: MatTable<RequestStatusStatementItemContext>;
  @Input() dataSource = [];

  constructor() { }

  ngOnInit(): void {
  }

  public get Unit(){
    return StatusStatementItemUnit;
  }

}
