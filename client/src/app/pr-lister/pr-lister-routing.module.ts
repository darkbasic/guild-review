import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrListComponent } from './components/pr-list/pr-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'prs', pathMatch: 'full'},
  {path: 'prs', component: PrListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PrListerRoutingModule { }
