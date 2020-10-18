import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuContext, MenuList, ProfileContext} from "../core/models";
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {MediaMatcher} from "@angular/cdk/layout";
import {CredentialsService} from "../core/authentication/credentials.service";
import {ProfileService} from "../core/authentication/profile.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ThemeService} from "../core/services";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,OnDestroy {
  loggedIn : boolean;
  userProfile?: ProfileContext;
  mobileQuery: MediaQueryList;
  menuList: MenuContext[] = MenuList;
  darkMode: boolean;

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              private credentialService: CredentialsService,
              private theme: ThemeService,
              overlayContainer: OverlayContainer,
              private profileService: ProfileService) {
    theme.themeStatus.subscribe(res => {this.darkMode = res;
      res ? overlayContainer.getContainerElement().classList.add('theme-alternate') : overlayContainer.getContainerElement().classList.remove('theme-alternate');
    });
    this.loggedIn = credentialService.isAuthenticated();
    if (this.loggedIn) {
      this.profileService.getProfile().subscribe((profile: ProfileContext) => {
        if (profile) {
          this.userProfile = profile;
        }
      });
    }
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      document.querySelector('.mat-sidenav-content').scrollTop = 0;
    });
  }

  ngOnInit() {
    this.theme.checkTheme();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
