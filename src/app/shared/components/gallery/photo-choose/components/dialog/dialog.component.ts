import {Component, Inject, OnInit} from '@angular/core';
import {GalleryAlbumContext, GalleryPhotoContext} from '@app/core/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalleryService} from '@app/core/services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface DialogData {
  photo?: GalleryPhotoContext | GalleryPhotoContext[],
  multiple?: boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  albums: GalleryAlbumContext[] = [];
  selectedAlbum: GalleryAlbumContext;
  selectedPhoto: GalleryPhotoContext[] = [];
  constructor( public dialogRef: MatDialogRef<DialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private galleryService: GalleryService,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getList();
    // if (this.data.multiple){
    //   this.form = this.formBuilder.group({
    //     images: this.formBuilder.array([])
    //   })
    // }else {
    //   this.form = this.formBuilder.group({
    //     image: this.formBuilder.group({
    //       id: ['', Validators.required],
    //       name: ['', Validators.required]
    //     })
    //   })
    // }
    this.form = this.formBuilder.group({
      album: ['', Validators.required]
    });
    this.form.controls['album'].valueChanges.subscribe(value => {
      this.selectedAlbum = this.albums.find(item => item.slug === value);
    });
  }
  getList(){
    this.galleryService.getGalleryAlbumList().subscribe(res => this.handleRes(res))
  }
  handleRes(res){
    this.albums = res;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // onSelect(photo: GalleryPhotoContext){
  //   this.dialogRef.close(photo);
  // }
  // onCheckboxChange(e) {
  //   if (this.data.multiple){
  //     const images: FormArray = this.form.get('images') as FormArray;
  //     if (e.checked) {
  //       images.push(new FormControl(e.source.value));
  //     } else {
  //       let i: number = 0;
  //       images.controls.forEach((item: FormControl) => {
  //         if (item.value == e.source.value) {
  //           images.removeAt(i);
  //           return;
  //         }
  //         i++;
  //       });
  //     }
  //     console.log(this.form.controls['images'].value);
  //   }else {
  //     this.form.get('image.id').setValue(e.source.value.id);
  //     this.form.get('image.name').setValue(e.source.value.name);
  //     console.log(this.form.controls['image'].value);
  //   }
  //
  // }
  updateSelected(e){
    this.selectedPhoto = e;
  }

  onSubmit(){
    this.dialogRef.close(this.data.multiple ? this.selectedPhoto : this.selectedPhoto[0])
  }
}
