import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { Show } from '../models/show';
import { Schedule } from '../models/schedule';
import { ApiModule } from '../api.module';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: ApiModule
})
export class ApiService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public getShowList(date: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`https://api.tvmaze.com/schedule/web?date=${date}&country=US`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.catchError(error))
      );
  }

  public getOneShow(showId: number): Observable<Show> {
    return this.http.get<Show>(`https://api.tvmaze.com/shows/${showId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.catchError(error))
      );
  }

  private catchError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) {
      this.router.navigateByUrl('/not-found');
    }
    return throwError(error);
  }
}
