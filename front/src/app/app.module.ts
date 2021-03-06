import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { HeaderComponent } from './header/header.component';
import { PrevozniciComponent } from './prevoznici/prevoznici.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PrevoznikComponent } from './prevoznik/prevoznik.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIcon, MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    PocetnaComponent,
    HeaderComponent,
    PrevozniciComponent,
    AdminLoginComponent,
    PrevoznikComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NoopAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
