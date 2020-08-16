import {Directive, HostListener, Input} from '@angular/core';
import {ProfileContext} from '@app/core/models';
import {MatDialog} from '@angular/material/dialog';
import {FavoriteDialogComponent} from '@app/shared/components/global/favorite-dialog/favorite-dialog.component';

@Directive({
  selector: '[appFavoriteDialog]'
})
export class FavoriteDialogDirective {
  @Input() favorites: ProfileContext[];

  constructor(public dialog: MatDialog) { }
  @HostListener('click') onClick() {
    this.dialog.open(FavoriteDialogComponent, {
      width: '350px',
      data: this.favorites
    });
  }

}
