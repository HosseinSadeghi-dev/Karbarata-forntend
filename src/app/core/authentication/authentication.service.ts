import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { throwError, BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { MemberContext } from "@app/core/models";
import { CredentialsService } from "./credentials.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public userMobile = new BehaviorSubject<string>(null);

  constructor(
    private httpClient: HttpClient,
    private credentials: CredentialsService
  ) {}

  onLogin(data) {
    return this.httpClient.post("/user/auth/login", data).pipe(
      (response: any) => response,
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  onVerify(data) {
    return this.httpClient.post("/user/auth/login/confirm", data).pipe(
      (response: any) => response,
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  onRegister(data) {
    return this.httpClient.post("/user/auth/register", data).pipe(
      (response: any) => response,
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getProfile(){
    return this.httpClient.get("/user/auth/profile").pipe(
      (response: any) => response,
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  // verifyUser(userContext: MemberContext) {
  //   const formData = this.helper.getFormData(userContext);
  //
  //   return this.httpClient.post("/users/api-token-auth/", formData).pipe(
  //     (response: any) => response,
  //     catchError((error: HttpErrorResponse) => throwError(error))
  //   );
  // }
  //
  // setPassword(formValues: any) {
  //   const formData = this.helper.getFormData(formValues);
  //
  //   return this.httpClient.post("/users/set-passwd/", formData).pipe(
  //     (response: any) => response,
  //     catchError((error: HttpErrorResponse) => throwError(error))
  //   );
  // }
  //
  // whichPassword(mobile: string) {
  //   const formData = this.helper.getFormData({ mobile });
  //
  //   return this.httpClient.post("/users/which-passwd/", formData).pipe(
  //     (response: any) => response,
  //     catchError((error: HttpErrorResponse) => throwError(error))
  //   );
  // }

  logout(): Observable<boolean> {
    this.credentials.setCredentials();
    return of(true);
  }
}
