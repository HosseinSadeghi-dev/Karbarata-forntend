import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GalleryAlbumContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {GalleryService} from '@app/core/services';
import {MatTableDataSource} from '@angular/material/table';
import {AlbumsDataSource} from "../../services";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  public data : GalleryAlbumContext[] = [];
  public message: string;

  dataSource : AlbumsDataSource;
  displayedColumns: string[] = ['count','name','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private galleryService: GalleryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadAlbumsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAlbumsPage())
      )
      .subscribe();
  }
  loadAlbumsPage() {
    this.dataSource.loadAlbums(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  getList(){
    this.paginator.firstPage();
    this.dataSource = new AlbumsDataSource(this.galleryService);
    this.dataSource.loadAlbums('', 'desc', 0, 5);
  }

  onRouter(slug){
    // const params = this.activatedRoute.snapshot.params;
    // console.log('params',params)
    // if (params.slug){
    //
    // }
    // else (){
    //
    // }
    this.router.navigateByUrl(`admin/gallery/album/${slug}`)
  }

  onDelete(slug){
    this.galleryService.deleteGalleryAlbum(slug).subscribe(
      () => this.router.navigateByUrl('admin/gallery/album')
    )
  }
}
