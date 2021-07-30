import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { ListTagsComponent } from './components/list-tags/list-tags.component';
import { CreateTagsComponent } from './components/create-tags/create-tags.component';
import { UpdateTagsComponent } from './components/update-tags/update-tags.component';
import { DeleteTagsComponent } from './components/delete-tags/delete-tags.component';
import { CoreModule } from '@core/core.module';
import { PrimngModule } from '../shared/primng/primng.module';

@NgModule({
  declarations: [ListTagsComponent, CreateTagsComponent, UpdateTagsComponent, DeleteTagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    CoreModule,
    PrimngModule
  ]
})
export class TagsModule { }
