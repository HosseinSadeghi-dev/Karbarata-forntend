import {Component, Inject, OnInit, Optional} from '@angular/core';
import {StatusStatementItemUnit} from "../../../../core/models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-request-statement-dialog',
  templateUrl: './request-statement-dialog.component.html',
  styleUrls: ['./request-statement-dialog.component.scss']
})
export class RequestStatementDialogComponent implements OnInit {

  action:string;
  local_data:any;
  stFormGroup: FormGroup;
  units = StatusStatementItemUnit;

  constructor(
    public dialogRef: MatDialogRef<RequestStatementDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private formBuilder: FormBuilder
  ) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    const form = this.stFormGroup.value;
    form.costTotal = form.cost * form.quantity;
    this.dialogRef.close({event:this.action,data: form});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
    this.stFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['', Validators.required],
      cost: [0, [Validators.required]],
      costTotal: [0, [Validators.required]]
    });
    if (this.action === 'Update' || this.action === 'Delete') {
      this.stFormGroup.get('name').setValue(this.local_data.status.name);
      this.stFormGroup.get('quantity').setValue(this.local_data.status.quantity);
      this.stFormGroup.get('unit').setValue(this.local_data.status.unit);
      this.stFormGroup.get('cost').setValue(this.local_data.status.cost);
      this.stFormGroup.get('costTotal').setValue(this.local_data.status.costTotal);
      this.stFormGroup.addControl('id', new FormControl(this.local_data.status.id, Validators.required));
    }
  }

  public get Unit(){
    return StatusStatementItemUnit;
  }

}
