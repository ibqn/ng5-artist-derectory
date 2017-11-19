import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';


const routes: Routes = [
  { path: '', component: ArtistSearchComponent },
  { path: 'detail/:id', component: ArtistDetailComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
