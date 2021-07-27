import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api/services/api.service';
import { Schedule, Show } from '../api/models';
import { ShowData } from './model/show-data';
import { map } from 'rxjs/operators';
import { MappedShow } from './model/mapped-show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private apiService: ApiService) {
  }

  public getShowData(date: string): Observable<ShowData> {
    return this.apiService.getShowList(date)
      .pipe(
        map((data: Schedule[]) => this.mapToShowList(data))
      );
  }

  public getOneShow(showId: number): Observable<Show> {
    return this.apiService.getOneShow(showId);
  }

  private mapToShowList(data: Schedule[]): ShowData {
    const showList: ShowData = {
      showList: [],
      genres: []
    };

    data.forEach((item: Schedule) => {
      const currentShowItem: Show = item._embedded.show;

      const show: MappedShow = {
        id: currentShowItem.id,
        title: currentShowItem.name,
        season: item.season,
        summary: currentShowItem.summary,
        image: currentShowItem.image,
        airstamp: new Date(item.airstamp),
        genres: currentShowItem.genres
      };

      if (show.genres && show.genres.length) {
        show.genres.forEach((genre: string) => {
          if (!showList.genres?.includes(genre)) {
            showList.genres?.push(genre);
          }
        });
      }

      showList.showList.push(show);
    });

    return showList;
  }
}
