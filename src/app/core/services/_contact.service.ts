import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactService {

  constructor(private httpClient: HttpClient){}


/////////////////////////////////
  findAllCooperation(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?
  ){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/cooperation`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneCooperaation(id){
    return this.httpClient.get(`/cooperation/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
///////////////////////////////////////////////////
  findAllContactUs(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?
  ){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/contactUs`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneContactUs(id){
    return this.httpClient.get(`/contactUs/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  ////////////////////////////
  findAllComplain(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?
  ){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/complain`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneComplain(id){
    return this.httpClient.get(`/complain/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }



}
