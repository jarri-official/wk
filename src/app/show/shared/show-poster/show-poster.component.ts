import { Component, Input } from '@angular/core';
import { Show } from '../../../api/models';
import { MappedShow } from '../../model/mapped-show';

@Component({
  selector: 'app-show-poster',
  templateUrl: './show-poster.component.html',
  styleUrls: ['./show-poster.component.scss']
})
export class ShowPosterComponent {

  @Input() public show: Show | MappedShow | undefined;
}
