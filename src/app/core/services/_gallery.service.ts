import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpClient: HttpClient){}

  saveGalleryPhoto(data){
    return this.httpClient.post(`/gallery/photo`, data, {
      reportProgress: true,
      observe: 'events'
      });
  }
  saveGalleryAlbum(data){
    return this.httpClient.post(`/gallery/album`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
  getGalleryAlbumList(
    filter = '',
    sortOrder = 'desc',
    pageNumber?,
    pageSize?
  ){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    return this.httpClient.get(`/gallery/album`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getGalleryAlbumBySlug(slug){
    return this.httpClient.get(`/gallery/album/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteGalleryAlbum(slug){
    return this.httpClient.delete(`/gallery/album/${slug}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateGalleryAlbum(slug,data){
    return this.httpClient.put(`/gallery/album/${slug}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getGalleryPhotoFilter(verb,data){
    return this.httpClient.get(`/gallery/photo?${verb}=${data}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getGalleryPhotoList(filter = '',
                      sortOrder = 'desc',
                      pageNumber?,
                      pageSize?){
    let params = new HttpParams()
      .set('filter', filter)
      .set('sortOrder', sortOrder ? sortOrder : 'asc' );

    if (pageNumber || pageNumber === 0)
      params = params.set('pageNumber', pageNumber.toString());

    if (pageSize)
      params = params.set('pageSize', pageSize.toString());

    return this.httpClient.get(`/gallery/photo`,{params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateGalleryPhoto(id,data){
    return this.httpClient.put(`/gallery/photo/${id}`,data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteGalleryPhoto(id){
    return this.httpClient.delete(`/gallery/photo/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
