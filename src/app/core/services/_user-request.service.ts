import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserRequestService {

  constructor(private httpClient: HttpClient){}

  // findAllRequest(){
  //   return this.httpClient.get(`/user/auth/request`).pipe(
  //     map((response: any) => response),
  //     catchError((error: HttpErrorResponse) => throwError(error))
  //   );
  // }

  findAllRequest(
    filter = '',
    sortOrder?,
    pageNumber?,
    pageSize?,
    verb = '',
    data = ''){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/user/auth/request`,{params}).pipe(
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

  requestContact(data){
    return this.httpClient.post(`/contact`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestCooperate(data){
    return this.httpClient.post(`/contact/cooperate`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  requestComplain(data){
    return this.httpClient.post(`/complain`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  userPayment(data, id){
    return this.httpClient.post(`/user/payment/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteRequest(id){
    return this.httpClient.delete(`/user/auth/request/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
