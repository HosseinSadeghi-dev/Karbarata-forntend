import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

import { CredentialsService } from "../authentication/credentials.service";

@Injectable({
  providedIn: "root"
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.credentialsService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Accept: "application/json",
          Authorization: `Bearer ${this.credentialsService.credentials}`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Accept: "application/json"
        }
      });
    }
    return next.handle(request);
  }
}
