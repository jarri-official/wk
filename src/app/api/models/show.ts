import { Rating } from './partials/rating';
import { WebChannel } from './partials/web-channel';
import { Schedule } from './partials/schedule';
import { Externals } from './partials/externals';
import { Image } from './partials/image';
import { Links } from './partials/links';

export interface Show {
  id: number,
  url: string,
  name: string,
  type: string,
  language: string,
  genres: string[],
  status: string,
  runtime: number,
  averageRuntime: number,
  premiered: string,
  officialSite: string,
  schedule: Schedule,
  rating: Rating,
  weight: number,
  network?: null,
  webChannel: WebChannel,
  dvdCountry?: null,
  externals: Externals,
  image: Image,
  summary: string,
  updated: number,
  _links: Links
}
