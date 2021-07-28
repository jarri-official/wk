import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, filter, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { ShowService } from '../show.service';
import { ShowData } from '../model/show-data';
import { ShowListFiltersComponent } from './show-list-filters/show-list-filters.component';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit, OnDestroy {
  @ViewChild(ShowListFiltersComponent) public showListFiltersComponent: ShowListFiltersComponent | undefined;
  public showData: ShowData | undefined;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public selectedGenres: string[] = [];
  private destroySubject$: Subject<void> = new Subject<void>();
  private searchDate: Date | undefined;

  constructor(private showService: ShowService,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
  }

  public ngOnInit(): void {
    this.setInitialDate();
    this.getShowData();
    this.watchDateChange();
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next(void 0);
  }

  public getShowData(): void {
    this.startLoading();

    this.showService.getShowData(this.datePipe.transform(this.searchDate, 'YYYY-MM-dd') as string)
      .pipe(
        finalize(() => this.completeLoading()),
        takeUntil(this.destroySubject$)
      )
      .subscribe((data: ShowData) => {
        this.showData = data;

        setTimeout(() => {
          this.selectedGenres = this.mapFilterGenresToValues(this.showListFiltersComponent?.genresFormArray.getRawValue());
        });
      });
  }

  private startLoading() {
    this.isLoading$.next(true);
  }

  private completeLoading() {
    this.isLoading$.next(false);
  }

  private watchDateChange(): void {
    this.onFiltersLoaded$()
      .pipe(
        switchMap(() => this.route.queryParams),
        map((queryParams: Params) => queryParams.date),
        map((date: string) => this.convertDateStringToDate(date)),
        filter((date: Date) => !!this.daysBetween(date, this.searchDate))
      )
      .subscribe((date: Date) => {
        this.searchDate = date;
        this.getShowData();
      });

    this.onFiltersLoaded$()
      .pipe(
        // @ts-ignore
        switchMap(() => this.showListFiltersComponent.genresFormArray.valueChanges),
        map((genres: boolean[]) => this.mapFilterGenresToValues(genres))
      )
      .subscribe((genres: string[]) => {
        this.selectedGenres = genres;
      });
  }

  private convertDateStringToDate(dateString: string): Date {
    if (!dateString || !this.validateDate(dateString)) {
      return new Date();
    }

    const splittedDate: string[] = dateString.split('-');
    try {
      return new Date(parseInt(splittedDate[0], 10), parseInt(splittedDate[1], 10) - 1, parseInt(splittedDate[2], 10));
    } catch (e) {
      return new Date();
    }
  }

  /**
   * Instead of using external library like moment I grab some code from stack overflow that calculates days difference
   * between two dataes
   * @param first
   * @param second
   * @private
   */
  private daysBetween(first: Date, second: Date | undefined): number {
    if (!first || !second) {
      return -1;
    }

    const one: Date = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    const two: Date = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    const millisecondsPerDay: number = 1000 * 60 * 60 * 24;
    const millisBetween: number = two.getTime() - one.getTime();
    const days: number = millisBetween / millisecondsPerDay;

    return Math.abs(Math.floor(days));
  }

  private setInitialDate() {
    const queryParamsDate: string = this.route.snapshot.queryParams.date;
    this.searchDate = queryParamsDate ? this.convertDateStringToDate(queryParamsDate) : new Date();
  }

  private validateDate(dateString: string): boolean {
    const regex: RegExp = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

    return regex.test(dateString);
  }

  private onFiltersLoaded$(): Observable<boolean> {
    return this.isLoading$
      .pipe(
        takeUntil(this.destroySubject$),
        filter((value: boolean) => !value),
        delay(0), // hacky thing that allows to enter into child component
        filter(() => !!this.showListFiltersComponent && !!this.showListFiltersComponent.formGroup)
      );
  }

  private mapFilterGenresToValues(filterValue: boolean[] | undefined): string[] {
    if (!filterValue) {
      return [];
    }

    const filteredGenres: string[] = [];

    filterValue.forEach((value: boolean, index: number) => {
      if (value && this.showData && this.showData.genres) {
        filteredGenres.push(this.showData.genres[index]);
      }
    });

    return filteredGenres;
  }
}
