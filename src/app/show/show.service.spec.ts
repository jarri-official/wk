import { TestBed } from '@angular/core/testing';

import { ShowService } from './show.service';
import { ApiService } from '../api/services/api.service';
import { ApiServiceMock } from '../api/mock/api.service.mock';
import { Schedule, Show } from '../api/models';
import { showItemMock, showListMock } from '../api/mock';

describe('ShowService', () => {
  let service: ShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowService,
        {
          provide: ApiService,
          useClass: ApiServiceMock
        }
      ]
    });
    service = TestBed.inject(ShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of shows', (done: DoneFn) => {
    const mockedListOfShow: Schedule[] = showListMock;

    service.getShowList('2021-02-04')
      .subscribe((showList: Schedule[]) => {
        expect(showList).toEqual(mockedListOfShow);
        done();
      });
  });

  it('should return on show', (done: DoneFn) => {
    const mockedShow: Show = showItemMock;

    service.getOneShow(1234)
      .subscribe((show: Show) => {
        expect(show).toEqual(mockedShow);
        done();
      })
  });
});
