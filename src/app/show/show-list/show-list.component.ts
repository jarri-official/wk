import { Component, OnInit } from '@angular/core';
import { ShowService } from '../show.service';
import { BehaviorSubject } from 'rxjs';
import { ShowData } from '../model/show-data';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  public showData: ShowData | undefined;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private showService: ShowService) {
  }

  public ngOnInit(): void {
    this.getShowData();
  }

  public getShowData(): void {
    this.startLoading();

    this.showService.getShowData('2021-02-04')
      .pipe(
        finalize(() => this.completeLoading())
      )
      .subscribe((data: ShowData) => {
        this.showData = data;
      });
  }

  private startLoading() {
    this.isLoading$.next(true);
  }

  private completeLoading() {
    this.isLoading$.next(false);
  }
}
