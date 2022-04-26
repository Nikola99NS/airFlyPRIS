import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LogoutComponent } from './logout/logout.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AuthGuard } from './shared/auth.guard';
import { PrevozniciComponent } from './prevoznici/prevoznici.component';


const routes: Routes = [
  { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
  { path:'pocetna', component: PocetnaComponent},
  { path:'login',component: LoginComponent},
  { path:'admin-login',component: AdminLoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'prevoznici', component:PrevozniciComponent}
];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

