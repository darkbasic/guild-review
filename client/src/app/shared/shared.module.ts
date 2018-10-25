import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { FormsModule } from "@angular/forms";

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  FormsModule,
  MatListModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class SharedModule { }
