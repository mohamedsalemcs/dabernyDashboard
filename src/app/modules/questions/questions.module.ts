import { NgModule } from '@angular/core';
import { QuestionsRoutingModule } from './questions-routing.module';
import { CoreModule } from '@core/core.module';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { PrimngModule } from '../shared/primng/primng.module';

@NgModule({
  declarations: [QuestionsListComponent],
  imports: [
    CoreModule,
    PrimngModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
