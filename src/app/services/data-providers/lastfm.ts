import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {TrackModel} from "../../components/main-view/track/track-model";
import {IdataProvider} from "./idata-provider";

@Injectable()
export class Lastfm implements IdataProvider  {
  private readonly url: string = "http://ws.audioscrobbler.com/2.0/";
  private readonly clientId: string = "e98a0a2057210b9e8801e9e6c8be3ddd";
  private readonly entities = {
    SEARCH : "track.search"
  };

  constructor(private http: HttpClient) {
  }

  private callToAPI(entity: string, queryParams) {
    let self = this;
    queryParams['method'] = entity;
    return self.http.get(this.url + self.buildQueryParamsFromObject(queryParams));
  }

  private buildQueryParamsFromObject(queryParamsObject: Object): string {
    let str = [];

    queryParamsObject["api_key"] = this.clientId;
    queryParamsObject["format"] = 'json';

    for(let p in queryParamsObject)
      if (queryParamsObject.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(queryParamsObject[p]));
      }
    return `?${str.join("&")}`;
  }

  public doSearch(searchVal: string) {
    let self = this;
    return self.callToAPI(self.entities.SEARCH, { track: searchVal });
  }

  public translateRequest(res) {
    let self = this,
      responseItems = [],
      results = res["results"]["trackmatches"];
    for(let i=0; i < results.track.length;i++) {
      let track = results.track[i];
      let trackModel = new TrackModel();

      trackModel.source = "lastfm";
      trackModel.artist = track["artist"];
      trackModel.title = track["name"];

      if(track["image"]) {
        trackModel.smallImage = track["image"][1]["#text"] || null;
        trackModel.mediumImage = track["image"][2]["#text"] || null;
        trackModel.largeImage = track["image"][3]["#text"] || null;
      }

      responseItems.push(trackModel);
    }

    return responseItems;
  }
}
