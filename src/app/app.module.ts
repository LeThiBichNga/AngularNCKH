import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Routes , RouterModule} from '@angular/router';
import { ErrorComponent } from './admin/commona/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
const appRouter : Routes=[
  {
    path: '',
    loadChildren:()=>import("./user/main/main.module").then((m)=>m.MainModule)
  },
  {
    path: 'admin',
    loadChildren:()=>import("./admin/maina/maina.module").then((m)=>m.MainaModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouter),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
