import { Pipe, PipeTransform } from '@angular/core';
import { MappedShow } from '../model/mapped-show';

@Pipe({
  name: 'showListGenreFilter'
})
export class ShowListGenreFilterPipe implements PipeTransform {

  transform(showList: MappedShow[], genres: string[]): MappedShow[] {
    return showList.filter((show: MappedShow) =>
      show.genres.some((genre: string) =>
        genres.includes(genre))
    );
  }
}
