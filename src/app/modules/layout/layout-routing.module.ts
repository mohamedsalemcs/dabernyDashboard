import { TagsModule } from './../tags/tags.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootLayoutComponent } from '@core/layout/root-layout/root-layout.component';
import { QuestionsModule } from '../questions/questions.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'questions',
        loadChildren: () => QuestionsModule
      },
      {
        path: 'tags',
        loadChildren: () => TagsModule
      }
    ],
    component: RootLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
