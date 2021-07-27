import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowItemComponent } from './show-item/show-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShowListComponent
  },
  {
    path: ':id',
    component: ShowItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule { }
