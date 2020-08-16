import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ArticleService {

  constructor(private httpClient: HttpClient){}

  saveArticleCategory(data){
    return this.httpClient.post(`/articleCategory`, data).pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleCategoryList(){
    return this.httpClient.get(`/articleCategory`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleCategoryById(slug){
    return this.httpClient.get(`/articleCategory/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateArticleCategory(slug,data){
    return this.httpClient.put(`/articleCategory/${slug}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteArticleCategory(slug){
    return this.httpClient.delete(`/articleCategory/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveArticle(data){
    return this.httpClient.post(`/article`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleList(){
    return this.httpClient.get(`/article`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleFilter(verb,data){
    return this.httpClient.get(`/article?${verb}=${data}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleBySlug(slug){
    return this.httpClient.get(`/article/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateArticle(slug,data){
    return this.httpClient.put(`/article/${slug}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateArticleStatus(slug,data){
    return this.httpClient.patch(`/article/${slug}/status`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteArticle(slug){
    return this.httpClient.delete(`/article/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleCommentListByArticle(slug){
    return this.httpClient.get(`/articleComment/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveArticleComment(slug,data){
    return this.httpClient.post(`/articleComment/${slug}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteArticleComment(id){
    return this.httpClient.delete(`/articleComment/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getArticleCommentList(){
    return this.httpClient.get(`/articleComment`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveArticleCommentReply(id,data){
    return this.httpClient.post(`/articleCommentReply/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  deleteArticleCommentReply(id){
    return this.httpClient.delete(`/articleCommentReply/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  saveFavoriteArticle(id){
    return this.httpClient.post(`/article/${id}/favorite`,'').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteFavoriteArticle(id){
    return this.httpClient.delete(`/article/${id}/favorite`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
