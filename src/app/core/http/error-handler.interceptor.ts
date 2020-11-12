import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';

import { Logger } from "./logger.service";
import { environment } from '@env/environment';
import {AppService, NotificationService} from '@app/core/services';

const log = new Logger("ErrorHandlerInterceptor");

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private appService: AppService,
              private notificationService: NotificationService){}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        tap(evt => {
        if (evt instanceof HttpResponse) {
          if(evt.body)
            this.appService.nextLoading(false);
          if (evt.body.message)
            this.notificationService.openSnackBar(evt.body.message);
        }
        }),
        catchError(error => this.errorHandler(error)));
  }

  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    this.appService.nextLoading(false);
    const res: any = response;
    this.notificationService.openSnackBar(res.error.message);
    if (!environment.production) {
      // Do something with the error
      log.error("Request error", response);
    }
    throw response;
  }
}
