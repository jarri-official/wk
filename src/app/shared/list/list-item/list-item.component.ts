import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MappedShow } from '../../../show/model/mapped-show';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() public show: MappedShow | undefined;
}
