import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  exports: [
    TableModule,
    DialogModule,
    ProgressSpinnerModule,
    PaginatorModule,
    FileUploadModule
  ]
})
export class PrimngModule { }
