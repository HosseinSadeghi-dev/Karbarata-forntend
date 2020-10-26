import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { every } from 'rxjs/operators';
import {RequestStatusType} from "@app/core/models";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {}

  ngOnInit(): void {
  }

  openLink(event: MouseEvent, item): void {
    this._bottomSheetRef.dismiss(item);
    event.preventDefault();
  }

  public get RequestStatus() {
    return RequestStatusType
  }

}
