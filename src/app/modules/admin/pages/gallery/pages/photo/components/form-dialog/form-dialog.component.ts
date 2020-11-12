import {Component, Inject, OnInit} from '@angular/core';
import {GalleryAlbumContext, GalleryPhotoContext} from '@app/core/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalleryService} from '@app/core/services';
import {HttpEventType} from '@angular/common/http';
import {SrcImagePipe} from "@app/shared/pipes/src-image.pipe";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  providers:[
      SrcImagePipe
  ]
})
export class FormDialogComponent implements OnInit {

  form = {
    name: null,
    album: null
  };
  albums: GalleryAlbumContext[] = [];
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: any = null;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public photo: GalleryPhotoContext,
    private galleryService: GalleryService,
    private srcImagePipe: SrcImagePipe
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // this.previewUrl = `https://endpoint.karbarata.com/api/upload/gallery/${this.photo.name}`;
    this.previewUrl = this.srcImagePipe.transform(this.photo.name);
    this.form.album = this.photo.album.slug;
    this.galleryService.getGalleryAlbumList().subscribe(
      res => this.handleResList(res.results)
    )
  }

  handleResList(res){
    this.albums = res;
  }

  onSubmit(){
    const formData = new FormData();
    this.fileData != null && (formData.append('image', this.fileData));
    formData.append('album', this.form.album);
    this.galleryService.updateGalleryPhoto(this.photo.id,formData).subscribe(res => this.handleRes(res))
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  handleRes(res){
    if (res.type === HttpEventType.UploadProgress) {
      this.fileUploadProgress = Math.round(res.loaded / res.total * 100);
    }else if (res.type === HttpEventType.Response) {
      this.fileUploadProgress = '';
      // this.app.handleResponse(res.body.message);
      this.dialogRef.close(true);
      // this.app.nextLoading(false);
    }

    this.onNoClick();
  }

}
