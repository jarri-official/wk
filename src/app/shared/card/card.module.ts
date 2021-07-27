import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';

const COMPONENTS: Type<any>[] = [
  CardComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CardModule {
}
