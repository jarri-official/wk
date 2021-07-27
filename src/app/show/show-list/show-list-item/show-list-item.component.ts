import { Component, Input } from '@angular/core';
import { MappedShow } from '../../model/mapped-show';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss']
})
export class ShowListItemComponent {
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
