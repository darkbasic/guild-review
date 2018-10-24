import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCheckboxModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatListModule,
    MatCheckboxModule,
  ],
  declarations: []
})
export class SharedModule { }
