import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OlympicDataServiceService {

  _url = '/assets/olympicData.json';

  constructor(private _http: HttpClient) { }

  getData(){
    return this._http.get(this._url);
  }

}
