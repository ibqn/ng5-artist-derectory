import { Component, OnInit } from '@angular/core';
import { ArtistOrder, ArtistDirection } from './artist.enum';


@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.sass'],
})
export class ArtistSearchComponent implements OnInit {
  // bind enum types
  ArtistOrder = ArtistOrder;
  ArtistDirection = ArtistDirection;

  query: string;
  direction: string;
  artistOrder: ArtistOrder;

  constructor() { }

  ngOnInit() {
    this.query = '';
    this.artistOrder = ArtistOrder.Name;
    this.direction = ArtistDirection.Ascending;
  }

}
