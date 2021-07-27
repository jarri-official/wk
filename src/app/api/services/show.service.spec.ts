import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ShowService } from './show.service';
import { Show } from '../models/show';
import { showItemMock, showListMock } from '../mock';

describe('ShowService', () => {
  let service: ShowService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ShowService
      ]
    });
    service = TestBed.inject(ShowService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    describe('when request is successful', () => {
      let showList: Show[];

      beforeEach(() => {
        showList = showListMock;
      });

      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/schedule/web?date=2021-02-04&country=US');
        expect(req.request.method).toEqual('GET');
        req.flush(showList);
      });

      it('should return shows list', () => {
        service.getList()
          .subscribe((shows: Show[]) => {
            expect(shows).toEqual(showList);
          });
      });
    });

    describe('when request is failed', () => {
      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/schedule/web?date=2021-02-04&country=US');
        expect(req.request.method).toEqual('GET');
        const mockError = new ErrorEvent('Network error', {
          message: 'Service unavailable',
        });

        req.error(mockError);
      });

      it('should return error message', () => {
        service.getList()
          .subscribe({
            error: (error: HttpErrorResponse) => {
              expect(error.error.message).toEqual('Service unavailable');
            }
          });
      });
    });
  });

  describe('getOne', () => {
    describe('when request is successful',  () => {
      let oneShow: Show;
      const showId: number = 49538;

      beforeEach(() => {
        oneShow = showItemMock;
      });

      afterEach(() => {
        const req = httpMock.expectOne('https://api.tvmaze.com/shows/' + showId);
        expect(req.request.method).toEqual('GET');
        req.flush(oneShow);
      });

      it('should return shows list', () => {
        service.getOne(showId)
          .subscribe((shows: Show) => {
            expect(shows).toEqual(oneShow);
          });
      });
    });
  })
});
