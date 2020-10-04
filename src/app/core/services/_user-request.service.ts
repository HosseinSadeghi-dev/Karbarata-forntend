import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserRequestService {

  constructor(private httpClient: HttpClient){}

  findAllRequest(){
    return this.httpClient.get(`/user/auth/request`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestSimple(data){
    return this.httpClient.post(`/user/auth/request/simple`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestMaster(data){
    return this.httpClient.post(`/user/auth/request/master`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestConstruct(data){
    return this.httpClient.post(`/user/auth/request/construct`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestPriceAdvice(data){
    return this.httpClient.post(`/user/auth/request/PriceAdvice`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestMunicipalService(data){
    return this.httpClient.post(`/user/auth/request/MunicipalService`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
