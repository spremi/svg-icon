import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { SvgIconService } from './svg-icon.service';

/**
 * Default icon width
 */
const DefaultIconWidth = 24;

/**
 * Default icon height
 */
const DefaultIconHeight = 24;

@Component({
  selector: 'ang-svg-icon',
  template: `
    <span [style.fill]="err ? errFill : 'inherit'" [innerHtml]="markup"> </span>
  `,
  styles: [],
})
export class SvgIconComponent implements OnInit, OnDestroy {
  /**
   * URL for the icon
   */
  private _url: string;

  /**
   * Icon width
   */
  private _width = DefaultIconWidth;

  /**
   * Icon height
   */
  private _height = DefaultIconHeight;

  /**
   * Scale factor
   * If specified, takes precedence over _width & _height.
   */
  private _scale: number;

  /**
   * Subscription
   */
  private _sub: Subscription;

  /**
   * Sanitized SVG markup
   */
  public markup: SafeHtml;

  /**
   * Error fetching icon
   */
  public err = false;

  /**
   * Fill color for SVG icon
   */
  public errFill: string;

  constructor(private iconSvc: SvgIconService) {}

  @Input()
  set url(url: string) {
    this._url = url;
  }

  @Input()
  set width(width: string) {
    const num = parseInt(width, 10);

    if (!isNaN(num)) {
      this._width = num;
    }
  }

  @Input()
  set height(height: string) {
    const num = parseInt(height, 10);

    if (!isNaN(num)) {
      this._height = num;
    }
  }

  @Input()
  set scale(scale: string) {
    const num = parseInt(scale, 10);

    if (!isNaN(num)) {
      this._scale = num;
    }
  }

  ngOnInit() {
    this.errFill = this.iconSvc.getErrorFill();

    this.markup = this.iconSvc.getBlank(this._width, this._height);

    this._sub = this.iconSvc.get(this._url).subscribe(
      (icon) => {
        this.markup = icon;
      },
      (error) => {
        this.err = true;

        this.markup = this.iconSvc.getError(this._width, this._height);
      },
    );
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
