import { Component, OnInit } from '@angular/core';
import {Youtube} from "../../../services/data-providers/youtube";
import {Lastfm} from "../../../services/data-providers/lastfm";
import {Itunes} from "../../../services/data-providers/itunes";
import {Soundcloud} from "../../../services/data-providers/soundcloud";
import {Subject, Observable} from "rxjs";
import {TrackModel} from "../track/track-model";
import {PlayerControlService} from "../../player/player-control.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyUp = new Subject<string>();
  public searchTerm: string;
  public searchResults: Array<TrackModel> = [];

  constructor(private playerController: PlayerControlService,private yt: Youtube, private lastfm: Lastfm, private itunes: Itunes, private soundcloud: Soundcloud) {
    let self = this;
    this.keyUp
      .map(event => (event["target"]["value"]))
      .debounceTime(1000)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(50))
      .subscribe((term) => {
        self.doSearch(term);
      });
  }

  ngOnInit() {
    this.doSearch("Top 100");
  }

  trackItemClicked(item) {
    let self = this;
    self.playerController.currentPlayingTrack = item;
  }

  doSearch(searchTerm) {
    let self = this,
      searchProviders: Array<string> = ['lastfm', 'itunes', 'soundcloud'];

    self.searchResults = [];

    for(let key in searchProviders) {
      let provider = searchProviders[key];
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
