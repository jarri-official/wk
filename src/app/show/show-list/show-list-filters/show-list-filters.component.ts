import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShowListFilters } from './model/show-list-filters';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-list-filters',
  templateUrl: './show-list-filters.component.html',
  styleUrls: ['./show-list-filters.component.scss']
})
export class ShowListFiltersComponent implements OnInit, OnDestroy {

  @Output() public genresChange: EventEmitter<ShowListFilters> = new EventEmitter();
  public formGroup: FormGroup | undefined;
  public allGenresChecked: boolean = false;
  private destroySubject$: Subject<void> = new Subject<void>();
  private genresSubject$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
  }

  @Input() public set genres(genres: string[]) {
    this.genresSubject$.next(genres);
  }

  public get genres(): string[] {
    return this.genresSubject$.getValue();
  }

  public get genresFormArray(): FormArray {
    return this.formGroup?.get('genres') as FormArray;
  }

  public get dateFormControl(): FormControl {
    return this.formGroup?.get('date') as FormControl;
  }

  public get queryParamsData(): Date {
    return this.route.snapshot.queryParams.date;
  }

  public ngOnInit(): void {
    this.buildForm();
    this.updateAllGenresChecked();
    this.handleGenreChange();
    this.handleDateChange();
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next(void 0);
  }

  public someSelected(): boolean {
    return this.genresFormArray
      .controls
      .filter((control: AbstractControl) => control.value).length > 0 && !this.allGenresChecked;
  }

  public setAll(allChecked: boolean): void {
    this.allGenresChecked = allChecked;

    this.genresFormArray.controls.forEach((control: AbstractControl) => control.setValue(allChecked));
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      date: this.formBuilder.control(new Date()),
      genres: this.formBuilder.array([])
    });

    this.genres?.forEach(() => {
      this.genresFormArray
        .push(this.formBuilder.control(true));
    });
  }

  private updateAllGenresChecked(): void {
    this.allGenresChecked = this.genresFormArray.controls.every((control: AbstractControl) => control.value);
  }

  private handleGenreChange(): void {
    this.genresFormArray.valueChanges
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe(() => this.updateAllGenresChecked());
  }

  private handleDateChange(): void {
    this.dateFormControl.valueChanges
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe((dateValue: Date) => {
        const date: string | null = this.datePipe.transform(dateValue, 'YYYY-MM-dd');

        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: {date},
            queryParamsHandling: 'merge'
          });
      });
  }
}
