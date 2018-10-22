import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrListComponent } from './components/pr-list/pr-list.component';
import { PrListerRoutingModule } from './pr-lister-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PrListerRoutingModule,
    SharedModule,
  ],
  declarations: [PrListComponent],
})
export class PrListerModule { }
