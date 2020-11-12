import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {GalleryService} from '@app/core/services';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';

@Component({
  selector: 'app-photo-upload-form',
  templateUrl: './photo-upload-form.component.html',
  styleUrls: ['./photo-upload-form.component.scss']
})
export class PhotoUploadFormComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @Output() private photoUpdated = new EventEmitter();
  @Input() album: string;
  files  = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {}

  uploadFile(file) {
    const formData = new FormData();
    formData.append('image', file.data);
    formData.append('album', this.album);
    file.inProgress = true;
    this.galleryService.saveGalleryPhoto(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        // this.app.handleResponse(event.body.message);
        this.photoUpdated.emit(true);
      }
    });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      if (file.progress !== 100){
        this.uploadFile(file);
      }
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++)
      {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
}
