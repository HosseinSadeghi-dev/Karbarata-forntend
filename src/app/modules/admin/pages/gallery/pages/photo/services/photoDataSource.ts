import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {GalleryPhotoContext} from "../../../../../../../core/models";
import {GalleryService} from "../../../../../../../core/services";


export class PhotoDataSource implements DataSource<GalleryPhotoContext>{

  private photoSubject = new BehaviorSubject<GalleryPhotoContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private galleryService: GalleryService){}

  loadPhotos(filter:string,
               sortDirection:string,
               pageIndex:number,
               pageSize:number) {
    this.galleryService
      .getGalleryPhotoList(filter, sortDirection, pageIndex, pageSize)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.photoSubject.next(res.results);
    this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<GalleryPhotoContext[]> {
    return this.photoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.photoSubject.complete();
  }
}
