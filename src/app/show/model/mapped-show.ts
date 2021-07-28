import { Image } from '../../api/models/partials/image';

export interface MappedShow {
  id: number;
  name: string;
  season: number;
  summary: string;
  airstamp: Date;
  genres: string[];
  image?: Image;
}
