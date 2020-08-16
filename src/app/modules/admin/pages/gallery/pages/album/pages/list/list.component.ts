import {Component, OnInit, ViewChild} from '@angular/core';
import {GalleryAlbumContext} from '@app/core/models';
import {MatPaginator} from '@angular/material/paginator';
import {GalleryService} from '@app/core/services';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public data : GalleryAlbumContext[] = [];
  public message: string;

  dataSource = null;
  displayedColumns: string[] = ['count','name','id'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.galleryService.getGalleryAlbumList().subscribe(
      res=> this.handleRes(res),
      err => this.handleErr(err)
    )
  }
  handleRes(res){
    this.data = res;
    this.dataSource = new MatTableDataSource<GalleryAlbumContext>(this.data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
  handleErr(err){
    console.log(err);
  }
  onDelete(slug){
    this.galleryService.deleteGalleryAlbum(slug).subscribe(res => this.getList())
  }
}
