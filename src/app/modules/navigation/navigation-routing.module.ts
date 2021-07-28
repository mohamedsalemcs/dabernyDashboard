import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RootLayoutComponent } from '@core/layout/root-layout/root-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SalesModule } from '../sales/sales.module';
import { CrmModule } from '../crm/crm.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProfileComponent },
      {
        path: 'dashboard',
        component: HomeComponent
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'sales',
        loadChildren: () => SalesModule
      },
      {
        path: 'crm',
        loadChildren: () => CrmModule
      }
    ],
    component: RootLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {}
