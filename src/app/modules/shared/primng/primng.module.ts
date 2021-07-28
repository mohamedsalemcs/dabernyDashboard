import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PaginatorModule } from 'primeng/paginator';
import { TreeModule } from 'primeng/tree';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [],
  exports: [
    CalendarModule,
    TableModule,
    DialogModule,
    ProgressSpinnerModule,
    ContextMenuModule,
    PaginatorModule,
    TreeModule,
    AutoCompleteModule
  ]
})
export class PrimngModule {}
