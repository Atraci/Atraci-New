import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TrackModel } from "../../components/main-view/track/track-model";
import {IdataProvider} from "./idata-provider";

@Injectable()
export class Youtube implements IdataProvider {
  private readonly url: string = "https://www.googleapis.com/youtube/v3/";
  private readonly entities = {
    SEARCH : "search"
  };
  private readonly clientId: string = "AIzaSyBSBOpf06j_i8IoQE9z-fcrBpAQVvs8y8A";

  constructor(private http: HttpClient) {
  }

  private callToAPI(entity: string, queryParams) {
    let self = this;
    return self.http.get(this.url + entity + self.buildQueryParamsFromObject(queryParams));
  }

  private buildQueryParamsFromObject(queryParamsObject: Object): string {
    let str = [];

    queryParamsObject["key"] = this.clientId;

    for(let p in queryParamsObject)
      if (queryParamsObject.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(queryParamsObject[p]));
      }
    return `?${str.join("&")}`;
  }

  public doSearch(searchVal: string) {
    let self = this;
    return self.callToAPI(self.entities.SEARCH, { q: searchVal, maxResults: 50, part: "snippet" });
  }

  public translateRequest(res) {
    let self = this,
      responseItems = [],
      results = res["items"];

    for(let i=0; i < results.length;i++) {
      let track = results[i];
      let trackModel = new TrackModel();

      trackModel.source = "youtube";
      trackModel.artist = track["snippet"]["title"];
      trackModel.title = track["snippet"]["title"];

      if (track["snippet"]["thumbnails"]) {
        trackModel.smallImage = track["snippet"]["thumbnails"]["default"]["url"] || null;
        trackModel.mediumImage = track["snippet"]["thumbnails"]["medium"]["url"] || null;
        trackModel.largeImage = track["snippet"]["thumbnails"]["high"]["url"] || null;
      }

      responseItems.push(trackModel);
    }

    return responseItems;
  }

}
