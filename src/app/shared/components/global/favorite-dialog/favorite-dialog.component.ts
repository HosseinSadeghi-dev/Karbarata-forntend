import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProfileContext} from '@app/core/models';

@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.scss']
})
export class FavoriteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FavoriteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public favorites: ProfileContext[]) { }

  ngOnInit(): void {
    console.log(this.favorites);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
