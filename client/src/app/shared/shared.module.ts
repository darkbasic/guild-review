import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatListModule,
  ],
  declarations: []
})
export class SharedModule { }
