import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Artist, ArtistItem } from '../artist';
import { switchMap } from 'rxjs/operators';
import { ArtistService } from '../artist.service';


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.sass'],
})
export class ArtistDetailComponent implements OnInit {
  artistItem$: Observable<ArtistItem>;

  constructor(
    private route: ActivatedRoute,
    private artists: ArtistService,
  ) { }

  getUrl = (artist: Artist): string => `/assets/images/${artist.shortname}_tn.jpg`;

  ngOnInit() {
    this.artistItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const artistId = params.get('id');
        return this.artists.getArtist(artistId);
      }),
    );
  }
}
