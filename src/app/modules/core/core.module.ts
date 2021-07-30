import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RootLayoutComponent } from './layout/root-layout/root-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { NotAuthorizedComponent } from './layout/not-authorized/not-authorized.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { HttpLoaderFactory } from './helpers/HttpLoaderFactory';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    RootLayoutComponent,
    HeaderComponent,
    UserProfileComponent,
    FooterComponent,
    SideMenuComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    AuthLayoutComponent,
    RootLayoutComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    TranslatePipe,
    FormsModule,
  ]
})
export class CoreModule { }
