import { Component, OnInit } from '@angular/core';
import { SearchOrder, SearchField } from '../search-options.enum';


@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.sass'],
})
export class ArtistSearchComponent implements OnInit {
  // bind enum types
  SearchField = SearchField;
  SearchOrder = SearchOrder;

  searchQuery: string;
  searchOrder: SearchOrder;
  searchField: SearchField;

  constructor() { }

  ngOnInit() {
    this.searchQuery = '';
    this.searchField = SearchField.Name;
    this.searchOrder = SearchOrder.Ascending;
  }

}
