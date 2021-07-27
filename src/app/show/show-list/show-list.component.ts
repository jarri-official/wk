import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, delay, filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ShowService } from '../show.service';
import { ShowData } from '../model/show-data';
import { ShowListFiltersComponent } from './show-list-filters/show-list-filters.component';
import { ShowListFilters } from './show-list-filters/model/show-list-filters';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ShowListComponent implements OnInit, OnDestroy {
  @ViewChild(ShowListFiltersComponent) public showListFiltersComponent: ShowListFiltersComponent | undefined;
  public showData: ShowData | undefined;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(private showService: ShowService,
              private datePipe: DatePipe) {
  }

  public ngOnInit(): void {
    this.getShowData();
    this.watchFiltersChange();
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next(void 0);
  }

  public getShowData(date: Date = new Date()): void {
    this.startLoading();

    this.showService.getShowData(this.datePipe.transform(date, 'YYYY-MM-dd') as string)
      .pipe(
        finalize(() => this.completeLoading()),
        takeUntil(this.destroySubject$)
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

  private watchFiltersChange(): void {
    this.isLoading$
      .pipe(
        filter((value: boolean) => !value),
        delay(0), // hacky thing that allows to enter into child component
        filter(() => !!this.showListFiltersComponent && !!this.showListFiltersComponent.formGroup),
        // @ts-ignore
        switchMap(() => this.showListFiltersComponent.formGroup.valueChanges),
        debounceTime(1),
        takeUntil(this.destroySubject$)
      )
      .subscribe((filters: ShowListFilters) => {
        this.getShowData(filters.date)
        /*if (this.showListFiltersComponent) {
          this.showListFiltersComponent.formGroup?.valueChanges.subscribe((v) => console.log(v));
        }*/
      });
  }
}
