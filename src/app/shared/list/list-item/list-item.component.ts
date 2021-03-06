import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MappedShow } from '../../../show/model/mapped-show';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() public show: MappedShow | undefined;

  constructor(private sanitizer: DomSanitizer) {
  }

  public get summary(): SafeHtml | null {
    if (this.show && this.show.summary) {
      return this.sanitizer.bypassSecurityTrustHtml(this.show.summary);
    }

    return null;
  }
}
