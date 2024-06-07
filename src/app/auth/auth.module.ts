import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    RegistrazioneComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
