import { ProfileService } from "./profile.service";
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import {CredentialsService} from '@app/core/authentication/credentials.service';

@Injectable({
  providedIn: "root",
})
export class RoutingGuard implements CanActivate {
  constructor(
    private router: Router,
    // private profilerService: ProfileService,
    private credentialsService: CredentialsService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let canActive = false;
    let permissions: any = [];
    // this.profilerService.getProfile().subscribe((Response: any) => {
    //   if (Response.roles) {
    //     Response.roles.map((role: any) => {
    //       permissions.push(role);
    //     });
    //   }
    // });

    permissions = this.credentialsService.Roles;

    canActive = this.roleMatch(permissions,route.data['roles'] as Array<string>);
    if (canActive) {
      return canActive;
    } else {
      this.router.navigate(["/forbidden"]);
    }
  }
  // async getRole(){
  //   const data = await this.profilerService.getProfile();
  //   if (data)
  //   return data;
  // }
  roleMatch(allowedRoles,Roles): boolean {
    let isMatch = false;
    let userRoles: any = Roles;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
