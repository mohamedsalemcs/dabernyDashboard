import { CoreModule } from './../core/core.module';
import { NavigationRoutingModule } from './navigation-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    CoreModule,
    ChartModule,
    FormsModule
  ]
})
export class NavigationModule {}
