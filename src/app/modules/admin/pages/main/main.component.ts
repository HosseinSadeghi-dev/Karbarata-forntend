import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NavItem, navItems, ProfileContext, UserRole} from '@app/core/models';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {ProfileService} from '@app/core/authentication/profile.service';
import {NavService, ThemeService} from '@app/core/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  // menuItems: MenuContext[] = DashboardMenuList;
  @ViewChild('appDrawer') appDrawer: ElementRef;

  nav: boolean = true
  dashboardItems: NavItem[] = navItems;
  mobileQuery: MediaQueryList;
  public loggedIn : boolean;
  public userProfile: ProfileContext;
  darkMode: boolean;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private theme: ThemeService,
              overlayContainer: OverlayContainer,
              public credentialService: CredentialsService,
              private profileService: ProfileService,
              private navService: NavService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
  }
  ngOnInit() {
    this.theme.checkTheme();
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    // this.user.deleteData();
    // this.token.remove();
    // this.auth.changeAuthStatus(false);
    // this.router.navigateByUrl('/');
  }
  public get UserRole(){
    return UserRole;
  }

  openSide(){
    this.nav ? this.navService.openNav() : this.navService.closeNav();
    this.nav = !this.nav;
  }

  changeTheme(){
    this.theme.nextTheme(!this.darkMode);
  }


}
