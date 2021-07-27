import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListFiltersComponent } from './show-list-filters.component';

describe('ShowListFiltersComponent', () => {
  let component: ShowListFiltersComponent;
  let fixture: ComponentFixture<ShowListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
