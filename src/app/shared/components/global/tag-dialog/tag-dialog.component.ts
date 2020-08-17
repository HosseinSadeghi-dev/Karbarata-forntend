import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TagDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public tags: string[]) { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
