import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {MasterSkillContext} from "../models";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConstructService {

  constructor(private httpClient: HttpClient){}

  findOneConstructSkill(slug){
    return this.httpClient.get(`/construct/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllConstructSkill(
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

    return this.httpClient.get(`/construct`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateConstructSkill(slug,data){
    return this.httpClient.put(`/construct/${slug}`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveConstructSkill(data){
    return this.httpClient.post(`/construct`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteConstructSkill(slug){
    return this.httpClient.delete(`/construct/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
