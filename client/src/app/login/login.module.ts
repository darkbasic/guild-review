import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule { }
