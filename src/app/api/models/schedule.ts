import { Links } from './partials/links';
import { Show } from './show';
import { Image } from './partials/image';

export interface Schedule {
  id: number,
  url: string,
  name: string,
  season: number,
  number: number,
  type: string,
  airdate: string,
  airtime: string,
  airstamp: string,
  runtime: number,
  image: Image | null,
  summary: string,
  _links: Links,
  _embedded: Show
}
