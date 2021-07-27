import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { RouterModule } from '@angular/router';

const COMPONENTS: Type<any>[] = [
  ListComponent,
  ListItemComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ListModule { }
