import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {IList} from "../../../shared/interfaces/list.interface";
import {lastValueFrom} from "rxjs";
import {IStats} from "../../../shared/interfaces/stats.interface";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private httpService: HttpService) { }

  getStats(): Promise<IStats> {
    return lastValueFrom(this.httpService.get('stats'))
  }}
