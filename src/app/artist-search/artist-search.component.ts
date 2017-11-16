import { Component, OnInit } from '@angular/core';


enum ArtistOrder {
  Name = 'name',
  Reknown = 'reknown',
}

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.sass'],
})
export class ArtistSearchComponent implements OnInit {
  // bind enum type
  ArtistOrder = ArtistOrder;

  query: string;
  direction: string;
  artistOrder: ArtistOrder;

  constructor() { }

  ngOnInit() {
    this.artistOrder = ArtistOrder.Name;
    this.direction = 'asc';
  }

}
