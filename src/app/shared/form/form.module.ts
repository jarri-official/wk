import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxChipComponent } from './checkbox-chip/checkbox-chip.component';

const COMPONENTS: Type<any>[] = [
  CheckboxChipComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class FormModule { }
