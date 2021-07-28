import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './components/customers/list-customers/list-customers.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { RootLayoutComponent } from '@core/layout/root-layout/root-layout.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: ListCustomersComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  { path: 'update-customer', component: UpdateCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
