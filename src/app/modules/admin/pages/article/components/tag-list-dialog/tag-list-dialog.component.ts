import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-tag-list-dialog',
  templateUrl: './tag-list-dialog.component.html',
  styleUrls: ['./tag-list-dialog.component.scss']
})
export class TagListDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TagListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public tags: string[]) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
