import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavModule } from '../nav/nav.module';
import { BodyComponent } from '../body/body.component';
import { BodyModule } from '../body/body.module';
import { NavComponent } from '../nav/nav.component';
import { CardComponent } from '../card/card.component';
import { PreviewComponent } from '../preview/preview.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BodyComponent,
    CardComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    NavModule,
    BodyModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
