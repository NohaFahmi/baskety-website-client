import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = environment.apiURL;
  constructor(private httpClient: HttpClient) {
  }

  get(apiURL: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${apiURL}`);
  }

  post(apiURL: string, body: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}${apiURL}`, body);
  }

  put(apiURL: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.API_URL}${apiURL}`, body);
  }

  delete(apiURL: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${apiURL}`);
  }
}
