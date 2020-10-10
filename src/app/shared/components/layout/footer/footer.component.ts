import { Component, OnInit } from '@angular/core';
import {ComplaintComponent} from "@app/shared/components/global/complaint/complaint.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ComplaintComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/')
    });
  }
}
