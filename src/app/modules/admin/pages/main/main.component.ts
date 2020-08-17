import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {OverlayContainer} from '@angular/cdk/overlay';
import {DashboardMenuList, MenuContext, ProfileContext, UserRole} from '@app/core/models';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {ProfileService} from '@app/core/authentication/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  menuItems: MenuContext[] = DashboardMenuList;
  mobileQuery: MediaQueryList;
  public loggedIn : boolean;
  public userProfile: ProfileContext;
  darkMode: boolean = false;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              overlayContainer: OverlayContainer,
              private credentialService: CredentialsService,
              private profileService: ProfileService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // theme.themeStatus.subscribe(res => {this.darkMode = res;
    //   res ? overlayContainer.getContainerElement().classList.add('alternative') : overlayContainer.getContainerElement().classList.remove('alternative');
    // });
    this.loggedIn = credentialService.isAuthenticated();
    if (this.loggedIn) {
      this.profileService.getProfile().subscribe((profile: ProfileContext) => {
        if (profile) {
          this.userProfile = profile;
        }
      });
    }
  }
  ngOnInit(): void {}

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
}
