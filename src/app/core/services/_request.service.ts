import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RequestService {

  constructor(private httpClient: HttpClient){}

  findAllRequest(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder);

    if (pageNumber)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/request`,{params}).pipe(
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

  //CONSTRUCT
  findAllConstruct(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder);

    if (pageNumber)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/request/construct`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveConstructRequest(data){
    return this.httpClient.post(`/request/construct`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateConstructRequest(id, data){
    return this.httpClient.put(`/request/${id}/construct`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteConstructRequest(id){
    return this.httpClient.delete(`/request/${id}/construct`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  //SIMPLES
  findAllSimple(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder);

    if (pageNumber)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/request/simple`,{params}).pipe(
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
  findAllMaster(
    filter = '',
    sortOrder = 'asc',
    pageNumber?,
    pageSize?,
    verb?,
    data?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder);

    if (pageNumber)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/request/master`,{params}).pipe(
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
  findOneMasterRequestSkills(id){
    return this.httpClient.get(`/request/${id}/master/skill`).pipe(
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
  deleteMasterRequestWorkForce(id,  masterId){
    return this.httpClient.delete(`/request/${id}/master/workforce/${masterId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  updateMasterRequestWorkForce(id, data, masterId){
    return this.httpClient.put(`/request/${id}/master/workforce/${masterId}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //contractor
  findAllRequestContractor(id){
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
  findOneRequestStatementList(id){
    return this.httpClient.get(`/request/${id}/statusStatement`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneRequestStatusStatementFilter(verb, data){
    return this.httpClient.get(`/requestStatusStatement?${verb}=${data}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllRequestStatementList(){
    return this.httpClient.get(`/requestStatusStatement`).pipe(
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

  //Reports
  findOneRequestReportList(id){
    return this.httpClient.get(`/request/${id}/report`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  //Invoice
  findOneRequestInvoiceList(id){
    return this.httpClient.get(`/request/${id}/invoice`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneRequestInvoice(id){
    return this.httpClient.get(`/requestInvoice/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateRequestInvoice(id, data){
    return this.httpClient.patch(`/requestInvoice/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveRequestInvoice(data){
    return this.httpClient.post(`/requestInvoice`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }



}
