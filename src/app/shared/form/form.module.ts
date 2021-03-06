import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

import { CheckboxChipComponent } from './checkbox-chip/checkbox-chip.component';

const COMPONENTS: Type<any>[] = [
  CheckboxChipComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class FormModule {
}
