import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

import { CredentialsService } from "./credentials.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(["/auth/login"], {
      replaceUrl: true
    });
    return false;
  }
}
