import {Directive, HostListener, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TagDialogComponent} from '@app/shared/components/global/tag-dialog/tag-dialog.component';

@Directive({
  selector: '[appTagDialog]'
})
export class TagDialogDirective {
  @Input() tags: string[];

  constructor(public dialog: MatDialog) { }
  @HostListener('click') onClick() {
    this.dialog.open(TagDialogComponent, {
      width: '350px',
      data: this.tags
    });
  }
}
