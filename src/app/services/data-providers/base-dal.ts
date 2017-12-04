import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BaseDal {
  constructor(private http: HttpClient) {
  }

  constructUrl(baseUrl: string, queryParams: Array<Object>): string {
    let fullUrl = baseUrl;
    for(let i=0; i < queryParams.length; i++) {
      fullUrl += `${i}=${queryParams[i]}`
    }
    return fullUrl;
  }

}
