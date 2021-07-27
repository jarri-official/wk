import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Show } from '../models/show';
import { Schedule } from '../models/schedule';
import { ApiModule } from '../api.module';

@Injectable({
  providedIn: ApiModule
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getShowList(date: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`https://api.tvmaze.com/schedule/web?date=${date}&country=US`);
  }

  public getOneShow(showId: number): Observable<Show> {
    return this.http.get<Show>(`https://api.tvmaze.com/shows/${showId}`);
  }
}
