import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {MasterCategoryContext, MasterSkillContext} from '@app/core/models';

@Injectable({
  providedIn: "root"
})
export class WorkforceService {

  constructor(private httpClient: HttpClient){}

  findOneMasterCategory(slug){
    return this.httpClient.get(`/workforce/master/category/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllMasterCategory(filter = '',
                        sortOrder = 'desc',
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

    return this.httpClient.get(`/workforce/master/category`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateMasterCategory(slug,data){
    return this.httpClient.put(`/workforce/master/category/${slug}`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveMasterCategory(data){
    return this.httpClient.post(`/workforce/master/category`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteMasterCategory(slug){
    return this.httpClient.delete(`/workforce/master/category/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneMasterSkill(slug){
    return this.httpClient.get(`/workforce/master/skill/${slug}`).pipe(
      map((response: MasterSkillContext) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllMasterSkill(
    filter = '',
    sortOrder = 'desc',
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

    return this.httpClient.get(`/workforce/master/skill`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateMasterSkill(slug,data){
    return this.httpClient.put(`/workforce/master/skill/${slug}`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveMasterSkill(data){
    return this.httpClient.post(`/workforce/master/skill`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteMasterSkill(slug){
    return this.httpClient.delete(`/workforce/master/skill/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
