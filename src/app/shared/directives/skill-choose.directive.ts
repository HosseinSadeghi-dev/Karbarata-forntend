import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MasterSkillContext} from "@app/core/models";
import {SkillChooseComponent} from "@app/shared/components/form-fields/skill-choose/skill-choose.component";

@Directive({
  selector: '[appSkillChoose]'
})
export class SkillChooseDirective {

  @Input() selected: MasterSkillContext[] =[];
  @Output() private skillUpdated = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(SkillChooseComponent,{
      width: '450px',
      height: '600px',
      data: {
        selected: this.selected
      }
    })

    dialogRef.afterClosed().subscribe(result => {
        this.skillUpdated.emit(result);
    });
  }

}
