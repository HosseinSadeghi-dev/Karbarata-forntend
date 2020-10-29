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
  routeParams: any;

  dataSource: PhotoDataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(
    private galleryService: GalleryService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    // fromEvent(this.input.nativeElement,'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.loadPhotosPage();
    //     })
    //   )
    //   .subscribe();

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadPhotosPage())
      )
      .subscribe();
  }

  loadPhotosPage() {
    this.activatedRoute.params.subscribe(routeParams => {
      if (routeParams.album){
        this.dataSource.loadPhotos(
          '',
          'desc',
          this.paginator.pageIndex,
          this.paginator.pageSize,
          'album',
          routeParams.album);
      }else {
        this.dataSource.loadPhotos(
          '',
          'desc',
          this.paginator.pageIndex,
          this.paginator.pageSize,);
      }
    });
  }



  getList(){
    this.paginator.firstPage();
    this.dataSource = new PhotoDataSource(this.galleryService);

    this.activatedRoute.params.subscribe(routeParams => {
      if (routeParams.album){
        this.album = routeParams.album;
        this.isUpload = true;
        this.dataSource.loadPhotos('', 'asc', 0, 5, 'album', routeParams.album);
        // this.galleryService.getGalleryPhotoFilter('album',routeParams.album).subscribe(res => this.handleResList(res))
      }else {
        this.isUpload = false;
        this.dataSource.loadPhotos('', 'desc', 0, 5);
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
      data: photo
    });

    dialogRef.afterClosed().subscribe(result => {
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
    this.galleryService.deleteGalleryPhoto(id).subscribe(
      () => this.getList()
    )
  }

}
