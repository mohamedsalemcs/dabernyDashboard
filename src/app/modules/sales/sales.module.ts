import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { ListCustomersComponent } from './components/customers/list-customers/list-customers.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';
import { ProfileCustomerComponent } from './components/customers/profile-customer/profile-customer.component';
import { CoreModule } from '@core/core.module';
import { PrimngModule } from '../shared/primng/primng.module';

@NgModule({
  declarations: [
    ListCustomersComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ProfileCustomerComponent
  ],
  imports: [CommonModule, SalesRoutingModule, CoreModule, PrimngModule]
})
export class SalesModule {}
