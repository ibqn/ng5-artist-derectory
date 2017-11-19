import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';


import { AppComponent } from './app.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistListComponent } from './artist-list/artist-list.component';

import { AppRoutingModule } from './app-routing.module';
import { ArtistService } from './artist.service';


@NgModule({
  declarations: [
    AppComponent,
    ArtistSearchComponent,
    ArtistDetailComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [
    ArtistService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
