import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  tap,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

import { Artist } from '../artist';
import { ArtistService } from '../artist.service';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass'],
})
export class ArtistListComponent implements OnInit {
  artists$: Observable<Artist[]>;

  private searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _query: string;

  @Input() set query(filter: string) {
    console.log(`f: '${filter}'`);
    this.searchQuery.next(filter);
  }
  get query(): string { return this._query; }

  constructor(private artistService: ArtistService) { }

  getUrl = (item): string => `/assets/images/${ item.shortname }_tn.jpg`;

  ngOnInit() {
    this.searchQuery.subscribe(query => this._query = query);

    this.artists$ = this.searchQuery.pipe(
      tap(_ => console.log('test')),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.artistService.searchArtists(query)),
    );
  }
}
