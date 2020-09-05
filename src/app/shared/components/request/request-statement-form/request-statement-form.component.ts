import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RequestService} from "@app/core/services";

import {
  RequestStatusStatementContext,
  RequestStatusStatementItemContext,
  StatusStatementItemUnit,
  StatusStatementType
} from "@app/core/models";

@Component({
  selector: 'app-request-statement-form',
  templateUrl: './request-statement-form.component.html',
  styleUrls: ['./request-statement-form.component.scss']
})
export class RequestStatementFormComponent implements OnInit {

  isView: boolean = false;
  displayedColumns: string[] = ['position', 'name', 'quantity','unit','cost','costTotal','action'];
  dataSource = [];
  statusStatement: RequestStatusStatementContext;
  @ViewChild(MatTable,{static:true}) table: MatTable<RequestStatusStatementItemContext>;
  stFormGroup: FormGroup;
  types = StatusStatementType;

  constructor(
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      type: ['', Validators.required],
      items: [[], [Validators.required,Validators.minLength(1)]]
    });
    const params = this.activatedRoute.snapshot.params;
    if (params.sid){
      this.requestService.findOneRequestStatement(params.sid).subscribe(
        res => this.handleRes(res),
      )
    }
  }

  handleRes(res){
    this.statusStatement = res;
    this.dataSource = res.items;
    this.stFormGroup.get('type').setValue(res.type);
    this.stFormGroup.get('items').setValue(this.dataSource);
    this.stFormGroup.disable();
    this.isView = true;
  }

  onSubmit(){
    const params = this.activatedRoute.snapshot.params,
      form = this.stFormGroup.value;
    if (params.id){
      if (params.sid){
        this.requestService.updateRequestStatusStatement(params.sid, form).subscribe(
          res => this.location.back()
        )
      }else {
        this.requestService.saveRequestStatusStatementByRequest(params.id, form).subscribe(
          res => this.location.back()
        )
      }
    }
  }

  updateExpertApproval(){
    const params = this.activatedRoute.snapshot.params;
    this.requestService.updateRequestStatementExpertApproval(params.id,{isExpertApproval: true}).subscribe(
      res => this.location.back()
    );
  }


  openDialog(action,obj) {
    const dialogRef = this.dialog.open(RequestStatementFormComponent, {
      width: '350px',
      data:{status: obj, action: action}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        switch(result.event) {
          case 'Add': {
            this.addRowData(result.data);
            break;
          }
          case 'Update': {
            this.updateRowData(result.data);
            break;
          }
          case  'Delete': {
            this.deleteRowData(result.data);
            break;
          }
        }
        this.stFormGroup.get('items').setValue(this.dataSource);
      }
    });
  }

  addRowData(row_obj){
    this.dataSource.push(row_obj);
    this.table.renderRows();
  }

  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.id = row_obj.id;
        value.name = row_obj.name;
        value.quantity = row_obj.quantity;
        value.unit = row_obj.unit;
        value.cost = row_obj.cost;
        value.costTotal = row_obj.costTotal;
      }
      return true;
    });
  }

  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  public get Type(){
    return StatusStatementType;
  }
  public get Unit(){
    return StatusStatementItemUnit;
  }

}
