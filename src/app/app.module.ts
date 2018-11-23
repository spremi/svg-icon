import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  SvgIconModule,
  SvgIconService,
} from 'projects/spremi/svg-icon/src/public_api';

import { AppComponent } from './app.component';

/**
 * Custom template for error SVG
 */
const CUST_ERROR = `<svg xmlns="http://www.w3.org/2000/svg"
  width="%WIDTH%" height="%HEIGHT%" viewBox="0 0 24 24">
    <path
       d="M 8 8 L 8 16 L 16 16 L 16 8 L 8 8 z M 10 10 L 14 10 L 14 14 L 10 14 L 10 10 z " />
    <rect
       width="4" height="4" x="4" y="4" />
    <rect
       width="4" height="4" x="4" y="16" />
    <rect
       width="4" height="4" x="16" y="16" />
    <rect
       width="4" height="4" x="16" y="4" />
  </svg >`;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SvgIconModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconSvc: SvgIconService) {
    this.iconSvc.setErrorFill('#ff1744');

    this.iconSvc.setErrorTemplate(CUST_ERROR);
  }
}
