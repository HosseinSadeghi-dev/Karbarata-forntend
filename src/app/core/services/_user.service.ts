import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private httpClient: HttpClient){}

  getFavoriteArticle(){
    return this.httpClient.get(`/user/favorite/article`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findUserById(id){
    return this.httpClient.get(`/user/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  // findAllUser(verb?, data?){
  //   return this.httpClient.get(`/user`,
  //     {
  //       params: new HttpParams().set(verb, data)
  //     }).pipe(
  //     map((response: any) => response),
  //     catchError((error: HttpErrorResponse) => throwError(error))
  //   );
  // }

  findAllUser(
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

    return this.httpClient.get(`/user`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteUser(id){
    return this.httpClient.delete(`/user/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUserStatus(id,data){
    return this.httpClient.patch(`/user/${id}/status`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUserRole(id,data){
    return this.httpClient.patch(`/user/${id}/role`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUser(id,data){
    return this.httpClient.put(`/user/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveUser(data){
    return this.httpClient.post(`/user`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveUserMaster(data){
    return this.httpClient.post(`/user/workforce/master`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllUserMaster(
    filter = '',
    sortOrder = 'desc',
    pageNumber?,
    pageSize?,
    verb?,
    data?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/user/workforce/master`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneUserMaster(id){
    return this.httpClient.get(`/user/workforce/master/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  updateUserMaster(id,data){
    return this.httpClient.put(`/user/workforce/master/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteUserMaster(id){
    return this.httpClient.delete(`/user/workforce/master/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }



  saveUserSimple(data){
    return this.httpClient.post(`/user/workforce/simple`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllUserSimple(
    filter = '',
    sortOrder = 'desc',
    pageNumber?,
    pageSize?,
    verb?,
    data?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    if(verb)
      params = params.set(verb, data);

    return this.httpClient.get(`/user/workforce/simple`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneUserSimple(id){
    return this.httpClient.get(`/user/workforce/simple/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUserSimple(id,data){
    return this.httpClient.put(`/user/workforce/simple/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUserSimpleStatus(id,status){
    return this.httpClient.patch(`/user/workforce/simple/${id}/status`,status).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteUserSimple(id){
    return this.httpClient.delete(`/user/workforce/simple/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllPayment(){
    return this.httpClient.get(`/user/auth/payment`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOnePayment(id){
    return this.httpClient.get(`/user/payment/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  ///// ADMINSTRATIVE

  findAllAdminstrative(
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

    return this.httpClient.get(`/user/adminstrative`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneAdminstrative(id){
    return this.httpClient.get(`/user/adminstrative/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError((error)))
    );
  }

  updateUserAdminstrative(id,data){
    return this.httpClient.put(`/user/adminstrative/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError((error)))
    );
  }

  createUserAdminstrative(data){
    return this.httpClient.post(`/user/adminstrative`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  createUser(data){
    return this.httpClient.post(`/user`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
