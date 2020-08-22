import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {MasterCategoryContext, MasterSkillContext} from '@app/core/models';

@Injectable({
  providedIn: "root"
})
export class WorkforceService {

  constructor(private httpClient: HttpClient){}

  findOneMasterCategory(slug){
    return this.httpClient.get(`/workforce/master/category/${slug}`).pipe(
      map((response: MasterCategoryContext) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllMasterCategory(){
    return this.httpClient.get(`/workforce/master/category`).pipe(
      map((response: MasterCategoryContext[]) => response),
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

  findAllMasterSkill(){
    return this.httpClient.get(`/workforce/master/skill`).pipe(
      map((response: MasterSkillContext[]) => response),
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
