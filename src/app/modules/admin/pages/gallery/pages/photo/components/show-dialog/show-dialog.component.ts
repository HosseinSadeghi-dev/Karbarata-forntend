import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalleryPhotoContext} from '@app/core/models';

@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public photo: GalleryPhotoContext) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
