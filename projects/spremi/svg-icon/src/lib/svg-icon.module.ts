import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SvgIconComponent } from './svg-icon.component';

@NgModule({
  imports: [],
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent],
})
export class SvgIconModule {
  constructor(@Optional() @SkipSelf() parentModule: SvgIconModule) {
    if (parentModule) {
      throw new Error(
        'SvgIconModule is already loaded. Import it in the AppModule only',
      );
    }
  }
}
