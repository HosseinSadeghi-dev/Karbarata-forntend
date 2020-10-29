import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from 'rxjs';

import {GalleryAlbumContext} from "@app/core/models";
import {GalleryService} from "@app/core/services";


export class AlbumsDataSource implements DataSource<GalleryAlbumContext>{

  private albumsSubject = new BehaviorSubject<GalleryAlbumContext[]>([]);
  private _pageTotal;
  private _total;

  get pageTotal(): number{
    return this._pageTotal;
  }

  get total(): number{
    return this._total;
  }

  constructor(private galleryService: GalleryService){}

  loadAlbums(filter:string,
               sortDirection:string,
               pageIndex:number,
               pageSize:number) {
    this.galleryService
      .getGalleryAlbumList(filter, sortDirection, pageIndex, pageSize)
      .subscribe(value => this.handleRes(value));
  }
  handleRes(res){
    this.albumsSubject.next(res.results);
    // this._pageTotal = res.page_total;
    this._total = res.total;
  }

  connect(collectionViewer: CollectionViewer): Observable<GalleryAlbumContext[]> {
    return this.albumsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.albumsSubject.complete();
  }
}
