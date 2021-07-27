import { TestBed } from '@angular/core/testing';

import { ShowService } from './show.service';
import { ApiService } from '../api/services/api.service';
import { ApiServiceMock } from '../api/mock/api.service.mock';
import { Show } from '../api/models';
import { showItemMock } from '../api/mock';
import { ShowData } from './model/show-data';

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

  it('should return mapped list of shows', (done: DoneFn) => {
    const mockedListOfShow: ShowData = {
      showList: [
        {
          id: 6544,
          title: 'Sesame Street',
          season: 51,
          summary: '<p><b>Sesame Street</b> is a widely recognized and perpetually daring experiment in educational children\'s programming. This show has taken popular-culture and turned it upside-down. The fast-paced advertisements that had parents of the new era worrying for their children were the basis for the original format of this show. The show has often satirized pop culture, and made itself easier for parents to watch along too. And thus, the positive impact this show has had on modern society is beyond another. No show is more recognized the world over by as many generations and walks of life. Shown in its original format or with changes to reflect a regional education focus, Sesame Street is now seen in over 140 countries. The show that Entertainment Weekly named the "20th Best Ever Show" has changed the education scene to focus on "entertainment". This has turned out to be a valuable theory that not only...</p>',
          imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/222/555972.jpg',
          airstamp: new Date('2021-02-04T17:00:00+00:00'),
          genres: [
            'Children'
          ]
        },
        {
          id: 16753,
          title: 'WWE Main Event',
          season: 10,
          summary: '<p><b>WWE Main Event</b> is a professional wrestling television program produced by WWE that originally aired on Ion Television in the United States and it originally aired on the WWE Network now airing on Hulu.</p>',
          imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/233/584404.jpg',
          airstamp: new Date('2021-02-04T17:00:00+00:00'),
          genres: [
            'Sports'
          ]
        }
      ],
      genres: [
        'Children',
        'Sports'
      ]
    };

    service.getShowData('2021-02-04')
      .subscribe((showList: ShowData) => {
        expect(showList).toEqual(mockedListOfShow);
        done();
      });
  });

  it('should return one show', (done: DoneFn) => {
    const mockedShow: Show = showItemMock;

    service.getOneShow(1234)
      .subscribe((show: Show) => {
        expect(show).toEqual(mockedShow);
        done();
      });
  });
});
