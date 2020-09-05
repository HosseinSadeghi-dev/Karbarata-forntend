import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProfileContext, UserRole} from "@app/core/models";
import {UserChooseComponent} from "@app/shared/components/form-fields/user-choose/user-choose.component";

@Directive({
  selector: '[appUserChoose]'
})
export class UserChooseDirective {
  @Input() roles: UserRole;
  @Input() multiple: boolean;
  @Input() selected: ProfileContext[] = [];
  @Output() private userUpdated = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(UserChooseComponent, {
      width: '950px',
      // panelClass: 'custom-dialog-container',
      data: {
        roles: this.roles,
        multiple: this.multiple,
        selected: this.selected
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        !this.multiple ? this.userUpdated.emit(result[0]) : this.userUpdated.emit(result);
      }
    });
  }
}
