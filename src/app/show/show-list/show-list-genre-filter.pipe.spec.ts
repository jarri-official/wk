import { ShowListGenreFilterPipe } from './show-list-genre-filter.pipe';
import { MappedShow } from '../model/mapped-show';

describe('ShowListGenreFilterPipe', () => {
  let pipe: ShowListGenreFilterPipe;
  const currentDate: Date = new Date();
  const mockedRecords: MappedShow[] = [
    {
      id: 123,
      name: 'name',
      season: 1,
      summary: 'summary',
      airstamp: currentDate,
      genres: [
        'genre1',
        'genre2',
        'genre3'
      ]
    },
    {
      id: 123,
      name: 'name',
      season: 1,
      summary: 'summary',
      airstamp: currentDate,
      genres: [
        'genre1'
      ]
    },
    {
      id: 123,
      name: 'name',
      season: 1,
      summary: 'summary',
      airstamp: currentDate,
      genres: [
        'genre2',
        'genre3'
      ]
    }
  ];

  beforeEach(() => {
    pipe = new ShowListGenreFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter items by category', () => {
    // given
    const expectedRecords: MappedShow[] = [
      {
        id: 123,
        name: 'name',
        season: 1,
        summary: 'summary',
        airstamp: currentDate,
        genres: [
          'genre1',
          'genre2',
          'genre3'
        ]
      },
      {
        id: 123,
        name: 'name',
        season: 1,
        summary: 'summary',
        airstamp: currentDate,
        genres: [
          'genre2',
          'genre3'
        ]
      }
    ];

    // when
    const filteredRecords: MappedShow[] = pipe.transform(mockedRecords, ['genre2', 'genre3']);

    // then
    expect(filteredRecords).toEqual(expectedRecords);
  });
});
