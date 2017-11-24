import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Artist } from './artist';
import { map, tap, catchError } from 'rxjs/operators';
import { SearchField, SearchOrder } from './search-options.enum';


interface SearchResponse {
  result: Artist[];
}

interface GetResponse {
  result: Artist;
}

@Injectable()
export class ArtistService {
  private url = '/api/artist';

  searchArtists = (
    searchTerm: string,
    field = SearchField.Name,
    direction = SearchOrder.Ascending
  ): Observable<Artist[]> => {
    console.log('get method');
    return this.http.get<SearchResponse>(
      `${this.url}/search/${searchTerm}/?sort=${field}&order=${direction}`).pipe(
      tap(_ => console.log('artists received')),
      map((response: SearchResponse) => response.result),
      // catchError((error: any): Observable<any> => { console.log('error'); return; }),
    );
  }

  getArtist = (artistId: string): Observable<Artist> => {
    console.log('get artist');
    return this.http.get<GetResponse>(`${this.url}/${artistId}`).pipe(
      tap(_ => console.log('received artist')),
      map((response: GetResponse) => response.result),
    );
  }

  constructor(private http: HttpClient) { }
}
