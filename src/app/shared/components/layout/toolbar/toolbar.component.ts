import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {ProfileService} from '@app/core/authentication/profile.service';
import {MenuContext, ProfileContext, MenuList} from '@app/core/models';
import {animate, style, transition, trigger} from '@angular/animations';
import {Helpers} from '../../../helpers';

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
  loggedIn : boolean;
  isScroll: boolean;
  userProfile: ProfileContext;
  menuItems: MenuContext[] = MenuList;
  public readonly helper = new Helpers();

  constructor(
    private credentialService: CredentialsService,
    private profileService: ProfileService,
    private router: Router) {
    this.loggedIn = credentialService.isAuthenticated();
    if (this.loggedIn) {
      profileService.getProfile().subscribe((profile: ProfileContext) => {
        if (profile) {
          this.userProfile = profile;
        }
      });
    }
  }

  ngOnInit(): void {
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    // this.user.deleteData();
    // this.token.remove();
    // this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/');
  }
}
