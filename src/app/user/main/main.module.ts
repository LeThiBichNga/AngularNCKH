import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes , RouterModule, Router} from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';
const appRouter : Routes=[
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      }
    ]  
  }
]
@NgModule({
  declarations: [
    HomeComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter),
    ShareModule
  ]
})
export class MainModule { }
