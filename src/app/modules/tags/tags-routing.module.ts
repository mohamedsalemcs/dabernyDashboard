import { ListTagsComponent } from './components/list-tags/list-tags.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootLayoutComponent } from '@core/layout/root-layout/root-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ListTagsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
