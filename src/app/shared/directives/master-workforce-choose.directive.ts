import {MatDialog} from "@angular/material/dialog";
import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {MasterSkillContext, ProfileContext, RequestMasterWorkforceContext, UserRole} from "@app/core/models";
import {RequestWorkforceMasterComponent} from "@app/shared/components/request/request-workforce-master/request-workforce-master.component";

@Directive({
  selector: '[appMasterWorkforceChoose]'
})
export class MasterWorkforceChooseDirective {

  @Input() workforces: RequestMasterWorkforceContext[] = [];
  @Input() skills: MasterSkillContext[] = [];
  @Input() id: number
  @Output() private dataUpdated = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(RequestWorkforceMasterComponent, {
      width: '1200px',
      height: '550px',
      // panelClass: 'custom-dialog',
      data: {
        workforces: this.workforces,
        skills: this.skills,
        id: this.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataUpdated.emit(result);
      }
    });
  }

}
