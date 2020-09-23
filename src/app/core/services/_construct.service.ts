import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

  findAllConstructSkill(){
    return this.httpClient.get(`/construct`).pipe(
      map((response: any[]) => response),
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
