import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  tap,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  combineLatest,
} from 'rxjs/operators';

import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { ArtistDirection, ArtistOrder } from '../artist-search/artist.enum';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass'],
})
export class ArtistListComponent implements OnInit {
  artists$: Observable<Artist[]>;

  private searchQuery = new BehaviorSubject<string>('');
  private searchDirection = new BehaviorSubject<ArtistDirection>(ArtistDirection.Ascending);
  private searchField = new BehaviorSubject<ArtistOrder>(ArtistOrder.Name);

  /*
  private _query: string;

  private _field: string;
  private _direction: string;
  */

  @Input() set field(field: ArtistOrder) {
    this.searchField.next(field);
  }

  @Input() set direction(direction: ArtistDirection) {
    this.searchDirection.next(direction);
  }

  /*
  private populateArtists = () => this.artists$ = this.artistService.searchArtists(
    this._query,
    this._field,
    this._direction
  )*/

  @Input() set query(filter: string) {
    console.log(`f: '${filter}'`);
    this.searchQuery.next(filter);
  }
  // get query(): string { return this._query; }

  constructor(private artistService: ArtistService) { }

  getUrl = (item): string => `/assets/images/${ item.shortname }_tn.jpg`;

  ngOnInit() {
    // this.searchQuery.subscribe(query => this._query = query);

    const searchObs = this.searchQuery.pipe(
      tap(_ => console.log('test')),
      debounceTime(300),
      distinctUntilChanged()
    );
    // const fieldObs = this.searchField.asObservable();
    // const directionObs = this.searchDirection.asObservable();
    this.artists$ = this.searchField.pipe(
      combineLatest(this.searchDirection, searchObs, (field, direction, query) => {
        return this.artistService.searchArtists(query, field, direction);
      }),
      switchMap((res: Observable<Artist[]>) => res),
    );

    /*
    this.artists$ = this.searchQuery.pipe(
      tap(_ => console.log('test')),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.artistService.searchArtists(query)),
    );
    */
  }
}
