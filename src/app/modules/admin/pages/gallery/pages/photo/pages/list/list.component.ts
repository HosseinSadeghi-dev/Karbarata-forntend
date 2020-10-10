import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GalleryPhotoContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {fromEvent, merge, Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {GalleryService} from '@app/core/services';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent, ShowDialogComponent} from '../../components';
import {MatSort} from "@angular/material/sort";
import {PhotoDataSource} from "../../services";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  isUpload: boolean = false;
  photos: GalleryPhotoContext[] = [];
  album: string;
  obs: Observable<any>;

  dataSource: PhotoDataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private galleryService: GalleryService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPhotosPage();
        })
      )
      .subscribe();

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadPhotosPage())
      )
      .subscribe();
  }

  loadPhotosPage() {
    this.dataSource.loadPhotos(
      this.input.nativeElement.value,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }



  getList(){
    this.paginator.firstPage();
    this.dataSource = new PhotoDataSource(this.galleryService);

    this.activatedRoute.params.subscribe(routeParams => {
      if (routeParams.album){
        this.album = routeParams.album;
        this.isUpload = true;
        this.dataSource.loadPhotos(routeParams.album, 'asc', 0, 5);
        // this.galleryService.getGalleryPhotoFilter('album',routeParams.album).subscribe(res => this.handleResList(res))
      }else {
        this.isUpload = false;
        this.dataSource.loadPhotos('', 'asc', 0, 5);
        // this.galleryService.getGalleryPhotoList().subscribe(res => this.handleResList(res))
      }
    });
  }
  // handleResList(res){
  //   this.photos = res;
  //   this.dataSource = new MatTableDataSource<GalleryPhotoContext>(this.photos);
  //   this.changeDetectorRef.detectChanges();
  //   this.dataSource.paginator = this.paginator;
  //   this.obs = this.dataSource.connect();
  // }

  openPhoto(photo: GalleryPhotoContext){
    const dialogRef = this.dialog.open(ShowDialogComponent, {
      // width: '100vw',
      // height: '100vh',
      data: photo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  editDialog(photo: GalleryPhotoContext){
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '350px',
      data: photo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getList();
      }
    });
  }
  onDelete(id: number){
    this.galleryService.deleteGalleryPhoto(id).subscribe(res => this.getList())
  }
}
