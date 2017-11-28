import { Component, OnInit } from '@angular/core';
import { SearchOrder, SearchField } from '../search-options.enum';
import { ArtistService } from '../artist.service';


@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.sass'],
})
export class ArtistSearchComponent implements OnInit {
  // bind enum types
  SearchField = SearchField;
  SearchOrder = SearchOrder;

  get searchQuery(): string {
    return this.artistService.query;
  }
  set searchQuery(query: string) {
    this.artistService.query = query;
  }

  set searchOrder(order: SearchOrder) {
    this.artistService.order = order;
  }
  get searchOrder(): SearchOrder {
    return this.artistService.order;
  }

  set searchField(field: SearchField) {
    // console.log(`search field set '${field}'`);
    this.artistService.field = field;
  }
  get searchField(): SearchField {
    return this.artistService.field;
  }

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.searchQuery = '';
    this.searchField = SearchField.Name;
    this.searchOrder = SearchOrder.Ascending;
  }
}
