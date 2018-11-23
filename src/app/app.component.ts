import { Component, OnDestroy, OnInit } from '@angular/core';
import { SvgIconService } from 'projects/spremi/svg-icon/src/public_api';
import { interval, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

/**
 * Another template for error SVG
 */
const ERR_SVG = `<svg xmlns="http://www.w3.org/2000/svg"
  width="%WIDTH%" height="%HEIGHT%" viewBox="0 0 24 24">
    <circle r="3" cy="12" cx="12" />
    <circle r="2" cy="6" cx="6" />
    <circle r="2" cy="6" cx="18" />
    <circle r="2" cy="18" cx="6" />
    <circle r="2" cy="18" cx="18" />
  </svg >`;

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _sub: Subscription;

  title = 'Demo @spremi/svg-icon';

  count = 5;

  /**
   * Was error icon changed?
   */
  errIconChanged = false;

  constructor(private iconSvc: SvgIconService) {}

  ngOnInit() {
    this._sub = interval(1000)
      .pipe(tap(() => this.count--))
      .pipe(
        filter(() => this.count === 0),
        take(1),
      )
      .subscribe(() => {
        this.iconSvc.setErrorFill('#ff3d00');
        this.iconSvc.setErrorTemplate(ERR_SVG);

        this.errIconChanged = true;
      });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
