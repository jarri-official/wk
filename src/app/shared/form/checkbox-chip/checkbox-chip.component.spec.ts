import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxChipComponent } from './checkbox-chip.component';

describe('CheckboxChipComponent', () => {
  let component: CheckboxChipComponent;
  let fixture: ComponentFixture<CheckboxChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
