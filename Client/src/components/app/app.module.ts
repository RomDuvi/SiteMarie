import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { NavModule } from '../nav/nav.module';
import { BodyComponent } from '../body/body.component';
import { BodyModule } from '../body/body.module';
import { NavComponent } from '../nav/nav.component';
import { CardComponent } from '../card/card.component';
import { PreviewComponent } from '../preview/preview.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddPictureComponent } from '../add-picture/add-picture.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/Guard/authGuard';
import { AuthService } from './services/Guard/auth.service';
import { AdminComponent } from '../admin/admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'pictures', component: BodyComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'preview', component: PreviewComponent},
  {path: '', redirectTo: '/pictures', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BodyComponent,
    CardComponent,
    PreviewComponent,
    AddPictureComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    NavModule,
    BodyModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
