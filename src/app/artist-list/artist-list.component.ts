import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Artist } from '../artist';
import { ArtistService } from '../artist.service';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass'],
})
export class ArtistListComponent implements OnInit {
  artists$: Observable<Artist[]>;

  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) { }

  getUrl = (item): string => `/assets/images/${ item.shortname }_tn.jpg`;

  gotoItem = (id: string) => {
    console.log(`index is ${id}`);
    /*
    const params = {
      query: this.query,
      order: this.direction,
      field: this.field,
    };
    */
    /*
    if (id <= 0) {
      params['prev'] = false;
    }
    if (id >= this.length - 1) {
      params['next'] = false;
    }
    */
    this.router.navigate(['detail', id]);
  }

  ngOnInit() {
    this.artists$ = this.artistService.getArtistsSubscription();
  }
}
