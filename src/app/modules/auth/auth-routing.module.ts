import { AuthLayoutComponent } from './../core/layout/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent }
    ],
    component: AuthLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
