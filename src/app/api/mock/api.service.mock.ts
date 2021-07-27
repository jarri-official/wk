import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import { of } from 'rxjs';
import { showListMock } from './show-list.mock';
import { showItemMock } from './show-item.mock';

export class ApiServiceMock {
  public getShowList: Spy = createSpy('getShowList')
    .and
    .returnValue(of(showListMock));

  public getOneShow: Spy = createSpy('getOneShow')
    .and
    .returnValue(of(showItemMock));
}
