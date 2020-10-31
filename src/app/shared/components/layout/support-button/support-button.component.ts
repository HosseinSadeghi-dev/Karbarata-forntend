import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogSupportButtonComponent} from "../../global/dialog-support-button/dialog-support-button.component";

@Component({
  selector: 'support-button',
  templateUrl: './support-button.component.html',
  styleUrls: ['./support-button.component.scss']
})
export class SupportButtonComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSupportButtonComponent, {
      width: '360px',
    });
  }

}
