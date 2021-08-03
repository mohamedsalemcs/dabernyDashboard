import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterestsListComponent } from './components/interests-list/interests-list.component';

const routes: Routes = [
  {
    path: '',
    component: InterestsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterestsRoutingModule { }
