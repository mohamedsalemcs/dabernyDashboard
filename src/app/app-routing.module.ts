import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { NotFoundComponent } from '@core/layout/not-found/not-found.component';
import { NotAuthorizedComponent } from '@core/layout/not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => AuthModule
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: 'navigation',
    loadChildren: () => NavigationModule
  },
  { path: 'NotFound', component: NotFoundComponent },
  { path: 'NotAuthorized', component: NotAuthorizedComponent },
  { path: '**', redirectTo: 'NotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
