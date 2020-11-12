import {Component, Inject, OnInit} from '@angular/core';
import {ProfileContext} from '@app/core/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-list-dialog',
  templateUrl: './favorite-list-dialog.component.html',
  styleUrls: ['./favorite-list-dialog.component.scss']
})
export class FavoriteListDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FavoriteListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public favorites: ProfileContext[]) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
