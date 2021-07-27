import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RouterModule } from '@angular/router';

const COMPONENTS: Type<any>[] = [
  HeaderComponent,
  MainContentComponent
];

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
export class LayoutModule {
}
