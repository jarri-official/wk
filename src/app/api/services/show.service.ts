import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ApiModule } from '../api.module';
import { Show } from '../models/show';

@Injectable({
  providedIn: ApiModule
})
export class ShowService {

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Show[]> {
    return this.http.get<Show[]>(`https://api.tvmaze.com/schedule/web?date=2021-02-04&country=US`);
  }

  public getOne(showId: number): Observable<Show> {
    return this.http.get<Show>(`https://api.tvmaze.com/shows/${showId}`)
  }
}
