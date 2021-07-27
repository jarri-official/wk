import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListLoaderComponent } from './show-list-loader.component';

describe('ShowListLoaderComponent', () => {
  let component: ShowListLoaderComponent;
  let fixture: ComponentFixture<ShowListLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
