import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient: HttpClient){}

  saveNewsCategory(data){
    return this.httpClient.post(`/news/category`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllNewsCategory(){
    return this.httpClient.get(`/news/category`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneNewsCategory(slug){
    return this.httpClient.get(`/news/category/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateNewsCategory(slug,data){
    return this.httpClient.put(`/news/category/${slug}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteNewsCategory(slug){
    return this.httpClient.delete(`/news/category/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveNews(data){
    return this.httpClient.post(`/news`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findAllNews(){
    return this.httpClient.get(`/news`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getNewsFilter(verb,data){
    return this.httpClient.get(`/news?${verb}=${data}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  findOneNews(slug){
    return this.httpClient.get(`/news/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateNews(slug,data){
    return this.httpClient.put(`/news/${slug}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateNewsStatus(slug,data){
    return this.httpClient.patch(`/news/${slug}/status`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteNews(slug){
    return this.httpClient.delete(`/news/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveFavoriteNews(id){
    return this.httpClient.post(`/news/${id}/favorite`,'').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteFavoriteNews(id){
    return this.httpClient.delete(`/news/${id}/favorite`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
