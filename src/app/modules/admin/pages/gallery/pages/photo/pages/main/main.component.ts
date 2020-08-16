import { Component, OnInit } from '@angular/core';
import {GalleryAlbumContext} from '@app/core/models';
import {GalleryService} from '@app/core/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  albums: GalleryAlbumContext[] = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryService.getGalleryAlbumList().subscribe(res=> this.handleRes(res))
  }
  handleRes(res){
    this.albums = res;
  }

}
