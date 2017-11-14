import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
