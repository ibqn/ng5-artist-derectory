import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Artist } from './artist';
import { map, tap, catchError } from 'rxjs/operators';


export interface SearchResponse {
  result: Artist[];
}

@Injectable()
export class ArtistService {
  private url = '/api/artist';

  searchArtists = (searchTerm: string): Observable<Artist[]> => {
    console.log('search');
    return this.http.get<SearchResponse>(`${this.url}/search/${searchTerm}`).pipe(
      tap(_ => console.log('data')),
      map((response: SearchResponse) => response.result),
      // catchError((error: any): Observable<any> => { console.log('error'); return; }),
    );
  }

  constructor(private http: HttpClient) { }
}
