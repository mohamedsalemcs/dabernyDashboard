import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterestsRoutingModule } from './interests-routing.module';
import { InterestsListComponent } from './components/interests-list/interests-list.component';
import { CoreModule } from '@core/core.module';
import { PrimngModule } from '../shared/primng/primng.module';

@NgModule({
  declarations: [InterestsListComponent],
  imports: [
    CoreModule,
    PrimngModule,
    InterestsRoutingModule
  ]
})
export class InterestsModule { }
