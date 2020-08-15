import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";

import { Helpers } from "@app/shared/helpers";
import {ProfileContext} from '@app/core/models';
// import { ProfileContext } from "@app/core/models";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  public readonly helper = new Helpers();
  public userProfile = new BehaviorSubject<any>({});

  constructor(private httpClient: HttpClient) {}


  updateProfile(userInfo: any) {
    return this.httpClient.put("/users/update/", userInfo).pipe(
      map((response: any) => {
        this.deleteUserCatch();
        this.getProfile();
        return response;
      }),
    );
  }

  private user$: Observable<ProfileContext>;
  private user: ProfileContext = null;

  public getProfile() {
    // Data available
    if (this.user) return of(this.user);
    // Request pending
    else if (this.user$) return this.user$;
    // New request needed
    else this.user$ = this.fetchUser();

    return this.user$;
  }

  public deleteUserCatch() {
    this.user$ = null;
    this.user = null;
  }

  private fetchUser() {
    return this.httpClient.get("/user/auth/profile").pipe(
      map(rawData => this.mapCachedUser(rawData)))
  }

  private mapCachedUser(body) {
    this.userProfile.next(body);
    this.user$ = null;
    this.user = body;
    return this.user;
  }

  contactMatch(phone_number: string) {
    return this.httpClient
      .post(`/users/contacts-check/`, { contacts: [phone_number] })
      .pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }
}
