import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RequestService {

  constructor(private httpClient: HttpClient){}

  findAllRequest(){
    return this.httpClient.get(`/request`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneRequest(id){
    return this.httpClient.get(`/request/${id}`).pipe(
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

  updateRequestStatus(id,data){
    return this.httpClient.patch(`/request/${id}/status`,data).pipe(
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

  saveSimpleRequest(data){
    return this.httpClient.post(`/request/simple`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateSimpleRequest(id, data){
    return this.httpClient.put(`/request/${id}/simple`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteSimpleRequest(id){
    return this.httpClient.delete(`/request/${id}/simple`).pipe(
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

  saveMasterRequest(data){
    return this.httpClient.post(`/request/master`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateMasterRequest(id, data){
    return this.httpClient.put(`/request/${id}/master`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteMasterRequest(id){
    return this.httpClient.delete(`/request/${id}/master`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //INFORMATION

  //status
  findAllRequestStatus(id){
    return this.httpClient.get(`/request/${id}/status`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //expert
  findOneRequestExpert(id){
    return this.httpClient.get(`/request/${id}/expert`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveRequestExpert(id,data){
    return this.httpClient.post(`/request/${id}/expert`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //workforce

  //simple
  findOneSimpleRequestWorkForce(id){
    return this.httpClient.get(`/request/${id}/simple/workforce`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveSimpleRequestWorkForce(id, data){
    return this.httpClient.post(`/request/${id}/simple/workforce`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //master
  findOneMasterRequestWorkForce(id){
    return this.httpClient.get(`/request/${id}/master/workforce`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveMasterRequestWorkForce(id, data){
    return this.httpClient.post(`/request/${id}/master/workforce`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //contractor
  findOneRequestContractor(id){
    return this.httpClient.get(`/request/${id}/contractor`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveRequestContractor(id,data){
    return this.httpClient.post(`/request/${id}/contractor`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //simple cost
  saveRequestSimpleCost(id,data){
    return this.httpClient.post(`/request/${id}/simple/cost`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //statusPerDay
  saveRequestPerDayStatus(id, data){
    return this.httpClient.post(`/request/${id}/perDay`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //report list
  findAllRequestReport(id){
    return this.httpClient.get(`/request/${id}/report`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveRequestReport(id, data){
    return this.httpClient.post(`/request/report/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //statement
  findAllRequestStatementList(id){
    return this.httpClient.get(`/request/${id}/statusStatement`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneRequestStatement(id){
    return this.httpClient.get(`/requestStatusStatement/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateRequestStatusStatement(id, data){
    return this.httpClient.put(`/requestStatusStatement/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveRequestStatusStatementByRequest(id, data){
    return this.httpClient.post(`/requestStatusStatement/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateRequestStatementExpertApproval(id, data){
    return this.httpClient.patch(`/requestStatusStatement/${id}/isExpertApproval`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
