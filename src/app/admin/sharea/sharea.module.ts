import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooteraComponent } from './footera/footera.component';
import { HeaderaComponent } from './headera/headera.component';
import { NavbaraComponent } from './navbara/navbara.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FooteraComponent, HeaderaComponent, NavbaraComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FooteraComponent,
    HeaderaComponent,
    NavbaraComponent
  ]
})
export class ShareaModule { }
