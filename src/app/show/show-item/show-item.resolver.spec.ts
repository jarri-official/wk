import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ShowItemResolver } from './show-item.resolver';
import { ShowServiceMock } from '../mock/show.service.mock';
import { ShowService } from '../show.service';
import { Show } from '../../api/models';
import { showItemMock } from '../../api/mock';

describe('ShowItemResolver', () => {
  let resolver: ShowItemResolver;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ShowService,
          useClass: ShowServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: 1234
            }
          }
        }
      ]
    });

    resolver = TestBed.inject(ShowItemResolver);
  });

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should return show', (done: DoneFn) => {
    const mockedShow: Show = showItemMock;

    console.log(route);

    resolver.resolve(route.snapshot)
      .subscribe((show: Show) => {
        expect(show).toEqual(mockedShow);
        done();
      });
  });
});
