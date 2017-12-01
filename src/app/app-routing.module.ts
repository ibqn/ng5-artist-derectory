import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: '',
    component: ArtistSearchComponent,
    data: {
      animation: 'search'
    }
  },
  {
    path: 'detail/:id',
    component: ArtistDetailComponent,
    data: {
      animation: 'detail'
    }
   },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: !environment.production } // <-- debugging purposes only
    )
  ],
  declarations: []
})
export class AppRoutingModule { }
