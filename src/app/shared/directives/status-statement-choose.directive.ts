import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestStatusStatementContext} from "@app/core/models";
import {RequestStatementChooseDialogComponent} from "@app/shared/components/request/request-statement-choose-dialog/request-statement-choose-dialog.component";

@Directive({
  selector: '[appStatusStatementChoose]'
})
export class StatusStatementChooseDirective {

  @Input() request: number;
  @Input() multiple: boolean;
  @Input() selected: RequestStatusStatementContext[] = [];
  @Output() private statusStatementUpdated = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(RequestStatementChooseDialogComponent, {
      width: '950px',
      // panelClass: 'custom-dialog-container',
      data: {
        request: this.request,
        multiple: this.multiple,
        selected: this.selected
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        !this.multiple ? this.statusStatementUpdated.emit(result[0]) : this.statusStatementUpdated.emit(result);
      }
    });
  }

}
