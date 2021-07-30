import { NgModule } from '@angular/core';
import { QuestionsRoutingModule } from './questions-routing.module';
import { CoreModule } from '@core/core.module';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';

@NgModule({
  declarations: [QuestionsListComponent],
  imports: [
    CoreModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
