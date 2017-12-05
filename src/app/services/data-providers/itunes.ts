import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TrackModel } from "../../components/main-view/track/track-model";
import { IdataProvider } from "./idata-provider";

@Injectable()
export class Itunes implements IdataProvider {
  public readonly url: string = "https://itunes.apple.com/";
  public readonly clientId: string;
  public readonly entities = {
    SEARCH : "search"
  };

  constructor(private http: HttpClient) {
  }

  public callToAPI(entity: string, queryParams) {
    let self = this;
    return self.http.get(this.url + entity + self.buildQueryParamsFromObject(queryParams));
  }

  public buildQueryParamsFromObject(queryParamsObject: Object): string {
    let str = [];

    queryParamsObject["entity"] = "musicTrack";

    for(let p in queryParamsObject)
      if (queryParamsObject.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(queryParamsObject[p]));
      }
    return `?${str.join("&")}`;
  }

  public doSearch(searchVal: string) {
    let self = this;
    return self.callToAPI(self.entities.SEARCH, { term: searchVal });
  }

  public translateRequest(res): Array<TrackModel> {
    let self = this,
      responseItems = [],
      results = res["results"];

    for(let i=0; i < results.length;i++) {
      let track = results[i];
      let trackModel = new TrackModel();

      trackModel.source = "itunes";
      trackModel.artist = track["artistName"];
      trackModel.title = track["trackName"];

      trackModel.smallImage = track["artworkUrl30"] || null;
      trackModel.mediumImage = track["artworkUrl60"] || null;
      trackModel.largeImage = track["artworkUrl100"] || null;

      responseItems.push(trackModel);
    }

    return responseItems;
  }
}
