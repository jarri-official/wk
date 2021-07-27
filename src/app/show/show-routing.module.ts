import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowListComponent } from './show-list/show-list.component';
import { ShowItemComponent } from './show-item/show-item.component';
import { ShowItemResolver } from './show-item/show-item.resolver';

const routes: Routes = [
  {
    path: '',
    component: ShowListComponent
  },
  {
    path: 'details/:id',
    component: ShowItemComponent,
    resolve: {
      show: ShowItemResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule { }
