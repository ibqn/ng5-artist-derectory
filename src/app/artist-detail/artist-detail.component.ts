import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Artist } from '../artist';
import { switchMap } from 'rxjs/operators/switchMap';
import { ArtistService } from '../artist.service';


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.sass'],
})
export class ArtistDetailComponent implements OnInit {
  artist$: Observable<Artist>;

  constructor(
    private route: ActivatedRoute,
    private artists: ArtistService,
  ) { }

  getUrl = (artist: Artist): string => `/assets/images/${artist.shortname}_tn.jpg`;

  ngOnInit() {
    this.artist$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const artistId = params.get('id');
        return this.artists.getArtist(artistId);
      }),
    );
  }
}
