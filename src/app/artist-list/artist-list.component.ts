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
import { SearchOrder, SearchField } from '../search-options.enum';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass'],
})
export class ArtistListComponent implements OnInit {
  artists$: Observable<Artist[]>;

  private searchQuery = new BehaviorSubject<string>('');
  private searchDirection = new BehaviorSubject<SearchOrder>(SearchOrder.Ascending);
  private searchField = new BehaviorSubject<SearchField>(SearchField.Name);

  @Input() set field(field: SearchField) {
    this.searchField.next(field);
  }

  @Input() set direction(direction: SearchOrder) {
    this.searchDirection.next(direction);
  }

  @Input() set query(filter: string) {
    console.log(`query filter: '${filter}'`);
    this.searchQuery.next(filter);
  }

  constructor(private artistService: ArtistService) { }

  getUrl = (item): string => `/assets/images/${ item.shortname }_tn.jpg`;

  ngOnInit() {
    const searchObs = this.searchQuery.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(_ => console.log('search query')),
    );
    this.artists$ = this.searchField.pipe(
      // combine three observables
      combineLatest(this.searchDirection, searchObs, (field, direction, query) =>
        this.artistService.searchArtists(query, field, direction)
      ),
      switchMap((res: Observable<Artist[]>) => res),
    );
  }
}
