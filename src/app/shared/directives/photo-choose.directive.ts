import {Directive, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {GalleryPhotoContext} from '@app/core/models';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../components/gallery/photo-choose/components';

@Directive({
  selector: '[appPhotoChoose]'
})
export class PhotoChooseDirective {
  @Input() photo: GalleryPhotoContext | GalleryPhotoContext[];
  @Input() multiple: boolean;
  @Output() private photoUpdated = new EventEmitter<GalleryPhotoContext | GalleryPhotoContext[]>();

  constructor(public dialog: MatDialog) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '950px',
      data: {photo: this.photo, multiple: this.multiple}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.photoUpdated.emit(result);
      }
    });
  }

}
