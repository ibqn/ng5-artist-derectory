import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Artist, ArtistItem } from './artist';
import {
  map,
  tap,
  catchError,
  debounceTime,
  distinctUntilChanged,
  combineLatest,
  switchMap,
} from 'rxjs/operators';

import { SearchField, SearchOrder } from './search-options.enum';


interface SearchResponse {
  result: Artist[];
}

interface GetResponse {
  artist: Artist;
  prevId: string;
  nextId: string;
}

@Injectable()
export class ArtistService {
  private url = '/api/artist';
  private artists$: Observable<Artist[]>;

  private length: number;

  private searchQuery = new BehaviorSubject<string>('');
  private searchOrder = new BehaviorSubject<SearchOrder>(SearchOrder.Ascending);
  private searchField = new BehaviorSubject<SearchField>(SearchField.Name);

  getArtistsSubscription = (): Observable<Artist[]> => this.artists$;

  set field(field: SearchField) {
    this.searchField.next(field);
  }
  get field(): SearchField {
    return this.searchField.getValue();
  }

  set order(order: SearchOrder) {
    this.searchOrder.next(order);
  }
  get order(): SearchOrder {
    return this.searchOrder.getValue();
  }

  set query(filter: string) {
    console.log(`query filter: '${filter}'`);
    this.searchQuery.next(filter);
  }
  get query(): string {
    return this.searchQuery.getValue();
  }

  searchArtists = (
    filter: string,
    field = SearchField.Name,
    order = SearchOrder.Ascending
  ): Observable<Artist[]> => {
    console.log('get method');
    return this.http.get<SearchResponse>(
      `${this.url}/search/${filter}/?sort=${field}&order=${order}`).pipe(
      tap(_ => console.log('artists received')),
      map((response: SearchResponse) => response.result),
      // catchError((error: any): Observable<any> => { console.log('error'); return; }),
    );
  }

  getArtist = (artistId: string): Observable<ArtistItem> => {
    console.log('get artist');
    return this.http.get<GetResponse>(
      `${this.url}/get/${artistId}?filter=${this.query}&field=${this.field}&order=${this.order}`
    ).pipe(
      tap(_ => console.log('received artist')),
      map((response: GetResponse) => response as ArtistItem),
    );
  }

  constructor(private http: HttpClient) {
    const searchObs = this.searchQuery.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(_ => console.log('search query')),
    );

    this.length = 0;

    this.artists$ = this.searchField.pipe(
      // combine three observables
      combineLatest(this.searchOrder, searchObs, (field, order, query) =>
        this.searchArtists(query, field, order)
      ),
      switchMap((res: Observable<Artist[]>) => res),
    );
    // this.artists$.subscribe(res => this.length = res.length);
  }
}
