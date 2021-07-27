import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../../api/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowItemComponent implements OnInit {
  public show: Show | undefined;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  public get summary(): SafeHtml | null {
    if (this.show && this.show.summary) {
      return this.sanitizer.bypassSecurityTrustHtml(this.show.summary);
    }

    return null;
  }

  public ngOnInit(): void {
    this.show = this.route.snapshot.data.show;
  }
}
