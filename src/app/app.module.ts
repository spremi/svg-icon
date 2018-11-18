import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  SvgIconModule,
  SvgIconService,
} from 'projects/spremi/svg-icon/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SvgIconModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconSvc: SvgIconService) {
    this.iconSvc.setErrorFill('purple');
  }
}
