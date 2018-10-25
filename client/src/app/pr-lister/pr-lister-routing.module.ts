import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrListComponent } from './components/pr-list/pr-list.component';
import { AuthGuard } from "../login/services/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'prs', pathMatch: 'full'},
  {path: 'prs', canActivate: [AuthGuard], component: PrListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrListerRoutingModule { }
