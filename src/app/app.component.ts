import { Component, OnInit } from '@angular/core';
import { trigger, transition } from '@angular/animations';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { tap } from 'rxjs/operators';

import { slideAnimation } from './slide.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('routerAnimations', [
      transition('* => *', slideAnimation),
      // transition('void => *', slideAnimation),
    ])
]
})
export class AppComponent implements OnInit {
  title = 'Artist Directory';
  artistId: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      console.log(url);
    });
  }

  prepareRouteTransition = (outlet): string | null => {
    const animation = outlet.activatedRouteData['animation'] || {};
    console.log(`animation ${animation}`);
    console.log(`current id '${this.artistId}'`);

    // return animation}-${Math.random()}` || null;
    return animation || null;
  }
}
