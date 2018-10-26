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
import { FlexLayoutModule } from "@angular/flex-layout";

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  FormsModule,
  FlexLayoutModule,
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
