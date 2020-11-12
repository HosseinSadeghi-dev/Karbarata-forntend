import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {ProfileService} from '@app/core/authentication/profile.service';
import {MenuContext, ProfileContext, MenuList} from '@app/core/models';
import {animate, style, transition, trigger} from '@angular/animations';
import {Helpers} from '../../../helpers';
import {AuthenticationService} from "@app/core/authentication/authentication.service";
import {ComplaintComponent} from "@app/shared/components/global/complaint/complaint.component";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ThemeService} from "@app/core/services";
import {MatDialog} from "@angular/material/dialog";

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('200ms ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('200ms ease-out', style({
    opacity: 0
  }))
]);

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: any;
  @Input() mobileQuery: MediaQueryList;
  darkMode: boolean = false;
  loggedIn : boolean;
  isScroll: boolean;
  userProfile: ProfileContext;
  menuItems: MenuContext[] = MenuList;
  public readonly helper = new Helpers();

  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService,
    private profileService: ProfileService,
    private theme: ThemeService,
    overlayContainer: OverlayContainer,
    private router: Router) {
    theme.themeStatus.subscribe(res => {this.darkMode = res;
      res ? overlayContainer.getContainerElement().classList.add('theme-alternate') : overlayContainer.getContainerElement().classList.remove('theme-alternate');
    });
    this.loggedIn = credentialService.isAuthenticated();
    if (this.loggedIn) {
      profileService.getProfile().subscribe((profile: ProfileContext) => {
        if (profile) {
          this.userProfile = profile;
        }
      });
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ComplaintComponent, {
      width: '360px',
    });

    // dialogRef.afterClosed().subscribe(() => {} );
  }

  ngOnInit() {
    this.theme.checkTheme();
  }

  changeTheme(){
    this.theme.nextTheme(!this.darkMode);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    // this.user.deleteData();
    // this.token.remove();
    // this.auth.changeAuthStatus(false);
    this.authenticationService.logout();
    // this.router.navigateByUrl('/');
    window.location.reload();
  }
}
