import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RequestService {

  constructor(private httpClient: HttpClient){}

  findAll(){
    return this.httpClient.get(`/request`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteRequest(id){
    return this.httpClient.delete(`/request/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //SIMPLES
  findAllSimple(){
    return this.httpClient.get(`/request/simple`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneSimple(id){
    return this.httpClient.get(`/request/simple/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteSimpleRequest(id){
    return this.httpClient.delete(`/request/simple/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //MASTERS
  findAllMaster(){
    return this.httpClient.get(`/request/master`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneMaster(id){
    return this.httpClient.get(`/request/master/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteMasterRequest(id){
    return this.httpClient.delete(`/request/master/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
