import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {TrackModel} from "../../components/main-view/track/track-model";
import {IdataProvider} from "./idata-provider";

@Injectable()
export class Soundcloud implements IdataProvider  {
  private readonly url: string = "https://api.soundcloud.com/";
  private readonly clientId: string = "dead160b6295b98e4078ea51d07d4ed2";
  private readonly entities = {
    SEARCH : "tracks"
  };

  constructor(private http: HttpClient) {
  }

  private callToAPI(entity: string, queryParams) {
    let self = this;
    return self.http.get(this.url + entity + self.buildQueryParamsFromObject(queryParams));
  }

  private buildQueryParamsFromObject(queryParamsObject: Object): string {
    let str = [];

    queryParamsObject["client_id"] = this.clientId;

    for(let p in queryParamsObject)
      if (queryParamsObject.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(queryParamsObject[p]));
      }
    return `?${str.join("&")}`;
  }

  public doSearch(searchVal: string) {
    let self = this;
    return self.callToAPI(self.entities.SEARCH, { q: searchVal });
  }

  public translateRequest(res) {
    let self = this,
      responseItems = [],
      results = res;

    for(let i=0; i < results.length;i++) {
      let track = results[i];
      let trackModel = new TrackModel();

      let explodedTrackName = track["title"].split(" - ");

      if(explodedTrackName.length >= 2) {
        trackModel.title = explodedTrackName[1];
        trackModel.artist = explodedTrackName[0];
      } else {
        trackModel.title = track["title"];
        trackModel.artist = "Unknown";
      }

      trackModel.source = "soundcloud";


      if(track["artwork_url"]) {
        trackModel.smallImage = track["artwork_url"] || null;
        trackModel.mediumImage = track["artwork_url"] || null;
        trackModel.largeImage = track["artwork_url"] || null;
      }

      responseItems.push(trackModel);
    }

    return responseItems;
  }
}
