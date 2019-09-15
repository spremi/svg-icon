import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { SvgGetOptions } from './svg-get-options';
import { SvgIconService } from './svg-icon.service';
import { take } from 'rxjs/operators';

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
    <div [style.fill]="err ? errFill : 'inherit'" [innerHtml]="markup"></div>
  `,
  styles: [
    `:host, :host div {
      display: inline-block;
      line-height: 0;
    }`
  ],
})
export class SvgIconComponent implements OnInit, OnChanges {
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

  @Input()
  url: string;

  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  scale: string;

  constructor(private iconSvc: SvgIconService) { }

  ngOnInit() {
    this.setUrl(this.url);
    this.setWidth(this.width);
    this.setHeight(this.height);
    this.setScale(this.scale);

    this.errFill = this.iconSvc.getErrorFill();

    this.markup = this.iconSvc.getBlank(this._width, this._height);

    this.getIcon();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const item in changes) {
      if (!item) {
        continue;
      }

      switch (item) {
        case 'url':
          this.setUrl(changes[item].currentValue as string);
          break;

        case 'width':
          this.setWidth(changes[item].currentValue as string);
          break;

        case 'height':
          this.setHeight(changes[item].currentValue as string);
          break;

        case 'scale':
          this.setScale(changes[item].currentValue as string);
          break;

        default:
      }
    }

    this.getIcon();
  }

  private getIcon() {
    let getOpts: SvgGetOptions;

    if (this._scale && this._scale !== 1) {
      getOpts = { scale: this._scale };
    } else if (this._width && this._height) {
      getOpts = { size: { width: this._width, height: this._height } };
    }

    this.iconSvc.get(this._url, getOpts).pipe(take(1)).subscribe(
      (icon) => {
        this.markup = icon;
      },
      (error) => {
        this.err = true;

        this.markup = this.iconSvc.getError(this._width, this._height);
      },
    );
  }

  private setUrl(url: string) {
    this._url = url;
  }

  private setWidth(width: string) {
    const num = parseInt(width, 10);

    if (!isNaN(num)) {
      this._width = num;
    }
  }

  private setHeight(height: string) {
    const num = parseInt(height, 10);

    if (!isNaN(num)) {
      this._height = num;
    }
  }

  private setScale(scale: string) {
    const num = parseInt(scale, 10);

    if (!isNaN(num)) {
      this._scale = num;
    }
  }
}
