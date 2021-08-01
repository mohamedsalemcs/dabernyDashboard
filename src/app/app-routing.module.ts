import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { NotFoundComponent } from '@core/layout/not-found/not-found.component';
import { NotAuthorizedComponent } from '@core/layout/not-authorized/not-authorized.component';
import { LayoutModule } from './modules/layout/layout.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { LoggedinGuard } from './modules/auth/guards/loggedin/loggedin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => LayoutModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate: [LoggedinGuard]
  },
  { path: 'NotFound', component: NotFoundComponent },
  { path: 'NotAuthorized', component: NotAuthorizedComponent },
  { path: '**', redirectTo: 'NotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
