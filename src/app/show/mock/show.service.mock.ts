import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import { of } from 'rxjs';
import { showItemMock, showListMock } from '../../api/mock';

export class ShowServiceMock {
  public getShowList: Spy = createSpy('getShowList')
    .and
    .returnValue(of(showListMock));

  public getOneShow: Spy = createSpy('getOneShow')
    .and
    .returnValue(of(showItemMock));
}
