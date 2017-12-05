import { Component, OnInit } from '@angular/core';
import {TrackModel} from "../track/track-model";
import {Subject, Observable} from "rxjs";

import {Lastfm} from "../../../services/data-providers/lastfm";
import {Itunes} from "../../../services/data-providers/itunes";
import {Soundcloud} from "../../../services/data-providers/soundcloud";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyUp = new Subject<string>();
  public searchTerm: string;
  public searchResults: Array<TrackModel> = [];

  private supportedSearchProviders: Array<string> = [
    'lastfm',
    'itunes',
    'soundcloud'
  ];

  constructor(private lastfm: Lastfm, private itunes: Itunes, private soundcloud: Soundcloud) {
    let self = this;
  }

  ngOnInit() {
    let self = this;

    self.doSearch("Skazi");

    self.keyUp
      .map(event => (event["target"]["value"]))
      .debounceTime(1000)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(50))
      .subscribe((term) => {
        self.doSearch(term);
      });
  }

  doSearch(searchTerm) {
    let self = this;

    self.searchResults = [];

    for(let key in self.supportedSearchProviders) {
      let provider = self.supportedSearchProviders[key];
      if(self[provider]) {
        self[provider].doSearch(searchTerm).subscribe((res) => {
          self.searchResults.push(...self[provider].translateRequest(res));
          self.searchResults.sort((a,b) => {
            if(!a.mediumImage || a.mediumImage < b.mediumImage)
              return -1;

            if(a.mediumImage > b.mediumImage)
              return 1;

            return 0;
          }).reverse();
        });
      }
    }
  }

}
