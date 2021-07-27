import { Injectable } from '@angular/core';
import { ShowModule } from './show.module';
import { ApiService } from '../api/services/api.service';
import { Observable } from 'rxjs';
import { Schedule, Show } from '../api/models';

@Injectable({
  providedIn: ShowModule
})
export class ShowService {

  constructor(private apiService: ApiService) {
  }

  public getShowList(date: string): Observable<Schedule[]> {
    return this.apiService.getShowList(date);
  }

  public getOneShow(showId: number): Observable<Show> {
    return this.apiService.getOneShow(showId);
  }
}
