import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  template: ''
})
class MainContentMockComponent {
}

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainContentComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: MainContentMockComponent
          },
          {
            path: '**',
            redirectTo: '/'
          }
        ])
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to main page', fakeAsync(() => {
    router.navigate(['random-path']);
    tick();
    expect(location.path()).toBe('/');
  }));
});
