import { Component, OnInit } from '@angular/core';
import {ProfileContext, UserRole, UserStatus} from '@app/core/models';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {ProfileService} from '@app/core/authentication/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: ProfileContext;
  constructor(private credentialService: CredentialsService,
              private profileService: ProfileService) {
    this.profileService.getProfile().subscribe((profile: ProfileContext) => {
      if (profile) {
        this.userProfile = profile;
      }
    });
  }

  ngOnInit(): void {

    // this.app.nextLoading(true);
    // this.api.getProfile().subscribe(
    //   res => this.handleResProfile(res),
    //   err => this.handleErr(err)
    // )
  }
  // handleResProfile(res){
  //   this.app.nextLoading(false);
  //   this.user.setUser(res);
  //   this.user.nextUser(this.user.getUser());
  // }
  // handleErr(err){
  //   this.app.nextLoading(false);
  //   // if (err.status === 401){
  //   //   this.logout();
  //   //   this.app.handleLogin('اهراز هویت انجام نشد لطفا دوباره وارد شوید!');
  //   // }
  // }

  public get UserRole(){
    return UserRole;
  }

  public get UserStatus(){
    return UserStatus;
  }

}
