import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Show } from '../../api/models';
import { ShowService } from '../show.service';

@Injectable({
  providedIn: 'root'
})
export class ShowItemResolver implements Resolve<Show> {

  constructor(private showService: ShowService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Show> {
    return this.showService.getOneShow(route.params.id);
  }
}
