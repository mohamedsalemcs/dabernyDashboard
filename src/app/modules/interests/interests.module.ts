import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterestsRoutingModule } from './interests-routing.module';
import { InterestsListComponent } from './components/interests-list/interests-list.component';
import { CoreModule } from '@core/core.module';
import { PrimngModule } from '../shared/primng/primng.module';
import { CreateInterestComponent } from './components/create-interest/create-interest.component';
import { UpdateInterestComponent } from './components/update-interest/update-interest.component';

@NgModule({
  declarations: [
    InterestsListComponent,
    CreateInterestComponent,
    UpdateInterestComponent
  ],
  imports: [
    CoreModule,
    PrimngModule,
    InterestsRoutingModule
  ]
})
export class InterestsModule { }
