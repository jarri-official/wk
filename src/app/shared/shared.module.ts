import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { ListModule } from './list/list.module';
import { FormModule } from './form/form.module';

const MODULES: Type<any>[] = [
  LayoutModule,
  ListModule,
  FormModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class SharedModule {
}
