import { Component, OnInit } from '@angular/core';
import {ComplaintComponent} from "@app/shared/components/global/complaint/complaint.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ThemeService} from "@app/core/services";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  darkMode: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private theme: ThemeService,
    overlayContainer: OverlayContainer,
    ) {
    theme.themeStatus.subscribe(res => {this.darkMode = res;
      res ? overlayContainer.getContainerElement().classList.add('theme-alternate') : overlayContainer.getContainerElement().classList.remove('theme-alternate');
    })
  }

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
