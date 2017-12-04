import {Observable} from "rxjs";
import {TrackModel} from "../../components/main-view/track/track-model";

export interface IdataProvider {
  url: string;
  clientId: string;
  entities;

  callToAPI(entity: string, queryParams?: Object): Observable;
  buildQueryParamsFromObject(queryParamsObject: Object): string;
  doSearch(searchVal: string): Observable;
  translateRequest(res): Array<TrackModel>;
}
