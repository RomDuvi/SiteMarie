import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { NavModule } from '../nav/nav.module';
import { BodyComponent } from '../body/body.component';
import { BodyModule } from '../body/body.module';
import { NavComponent } from '../nav/nav.component';
import { CardComponent } from '../card/card.component';
import { PreviewComponent } from '../preview/preview.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPictureComponent } from '../pictures/add-picture/add-picture.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/guard/authGuard';
import { AuthService } from './services/guard/auth.service';
import { AdminComponent } from '../admin/admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoriesComponent } from '../categories/categories.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { PicturesComponent } from '../pictures/pictures.component';
import { AddCategoryComponent } from '../categories/add-category/add-category.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'preview', component: PreviewComponent},
  {path: '', redirectTo: '/categories', pathMatch: 'full'},
  {path: 'pictures/:categoryId', component: PicturesComponent}
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
    AdminComponent,
    CategoriesComponent,
    PicturesComponent,
    AddCategoryComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    NavModule,
    BodyModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularDraggableModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FontAwesomeModule
  ],
  entryComponents: [
    AddCategoryComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faTrash, faPencilAlt, faPlusCircle);
  }
}
