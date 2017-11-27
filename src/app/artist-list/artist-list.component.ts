import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  private length: number;

  private searchQuery = new BehaviorSubject<string>('');
  private searchDirection = new BehaviorSubject<SearchOrder>(SearchOrder.Ascending);
  private searchField = new BehaviorSubject<SearchField>(SearchField.Name);

  @Input() set field(field: SearchField) {
    this.searchField.next(field);
  }

  get field() {
    return this.searchField.getValue();
  }

  @Input() set direction(direction: SearchOrder) {
    this.searchDirection.next(direction);
  }

  get direction() {
    return this.searchDirection.getValue();
  }

  @Input() set query(filter: string) {
    console.log(`query filter: '${filter}'`);
    this.searchQuery.next(filter);
  }

  get query() {
    return this.searchQuery.getValue();
  }

  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) { }

  getUrl = (item): string => `/assets/images/${ item.shortname }_tn.jpg`;

  gotoItem = (id: string) => {
    console.log(`index is ${id} of ${this.length}`);
    const params = {
      query: this.query,
      order: this.direction,
      field: this.field,
    };
    /*
    if (id <= 0) {
      params['prev'] = false;
    }
    if (id >= this.length - 1) {
      params['next'] = false;
    }
    */
    this.router.navigate(['detail', id, params]);
  }

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

    this.length = 0;
    this.artists$.subscribe(res => this.length = res.length);
  }
}
