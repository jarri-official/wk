import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ShowRoutingModule } from './show-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { SharedModule } from '../shared/shared.module';
import { ShowListFiltersComponent } from './show-list/show-list-filters/show-list-filters.component';
import { ShowListLoaderComponent } from './show-list/show-list-loader/show-list-loader.component';
import { ShowListItemComponent } from './show-list/show-list-item/show-list-item.component';
import { ShowPosterComponent } from './shared/show-poster/show-poster.component';
import { ShowListGenreFilterPipe } from './show-list/show-list-genre-filter.pipe';

@NgModule({
  declarations: [
    ShowListComponent,
    ShowItemComponent,
    ShowListFiltersComponent,
    ShowListLoaderComponent,
    ShowListItemComponent,
    ShowPosterComponent,
    ShowListGenreFilterPipe,
  ],
  imports: [
    CommonModule,
    ShowRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    DatePipe
  ]
})
export class ShowModule {
}
