import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AreYouSureComponent>
    ) { }

  ngOnInit(): void {
  }

  close(ans: boolean){
    this.dialogRef.close(ans);
  }

}
