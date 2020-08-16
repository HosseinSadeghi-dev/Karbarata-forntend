import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {GalleryPhotoContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {GalleryService} from '@app/core/services';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent, ShowDialogComponent} from '../../components';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isUpload: boolean = false;
  photos: GalleryPhotoContext[] = [];
  album: string;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private galleryService: GalleryService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.activatedRoute.params.subscribe(routeParams => {
      if (routeParams.album){
        this.album = routeParams.album;
        this.isUpload = true;
        this.galleryService.getGalleryPhotoFilter('album',routeParams.album).subscribe(res => this.handleResList(res))
      }else {
        this.isUpload = false;
        this.galleryService.getGalleryPhotoList().subscribe(res => this.handleResList(res))
      }
    });
  }
  handleResList(res){
    this.photos = res;
    this.dataSource = new MatTableDataSource<GalleryPhotoContext>(this.photos);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

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
