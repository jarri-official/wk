import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiService } from './api.service';
import { showItemMock, showListMock } from '../mock';
import { Schedule, Show } from '../models';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    const searchDate: string = '2021-02-04';

    describe('when request is successful', () => {
      let showList: Schedule[];

      beforeEach(() => {
        showList = showListMock;
      });

      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/schedule/web?date=' + searchDate + '&country=US');
        expect(req.request.method).toEqual('GET');
        req.flush(showList);
      });

      it('should return shows list', () => {
        service.getShowList(searchDate)
          .subscribe((shows: Schedule[]) => {
            expect(shows).toEqual(showList);
          });
      });
    });

    describe('when request is failed', () => {
      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/schedule/web?date=' + searchDate + '&country=US');
        expect(req.request.method).toEqual('GET');
        const mockError = new ErrorEvent('Network error', {
          message: 'Service unavailable'
        });

        req.error(mockError);
      });

      it('should return error message', () => {
        service.getShowList(searchDate)
          .subscribe({
            error: (error: HttpErrorResponse) => {
              expect(error.error.message).toEqual('Service unavailable');
            }
          });
      });
    });
  });

  describe('getOne', () => {
    const showId: number = 49538;

    describe('when request is successful', () => {
      let oneShow: Show;

      beforeEach(() => {
        oneShow = showItemMock;
      });

      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/shows/' + showId);
        expect(req.request.method).toEqual('GET');
        req.flush(oneShow);
      });

      it('should return shows list', () => {
        service.getOneShow(showId)
          .subscribe((shows: Show) => {
            expect(shows).toEqual(oneShow);
          });
      });
    });

    describe('when request is failed', () => {
      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/shows/' + showId);
        expect(req.request.method).toEqual('GET');
        const mockError = new ErrorEvent('Network error', {
          message: 'Service unavailable'
        });

        req.error(mockError);
      });

      it('should return error message', () => {
        service.getOneShow(showId)
          .subscribe({
            error: (error: HttpErrorResponse) => {
              expect(error.error.message).toEqual('Service unavailable');
            }
          });
      });
    });
  });
});
