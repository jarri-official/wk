import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRoutingModule } from './show-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShowListComponent,
    ShowItemComponent
  ],
  imports: [
    CommonModule,
    ShowRoutingModule,
    SharedModule
  ]
})
export class ShowModule { }
