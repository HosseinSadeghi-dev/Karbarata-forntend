import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessorEditorComponent } from './accessor-editor.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AccessorEditorComponent],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule
  ],
  exports: [AccessorEditorComponent]
})
export class AccessorEditorModule { }
