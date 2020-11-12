import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'album',
    loadChildren: () => import('./pages/album/album.module').then(m => m.AlbumModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./pages/photo/photo.module').then(m => m.PhotoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
