import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SvgGetOptions } from './svg-get-options';

/**
 * Default template for blank SVG
 */
const TPL_BLANK = `<svg xmlns="http://www.w3.org/2000/svg"
  width="%WIDTH%" height="%HEIGHT%"
  viewBox="0 0 %WIDTH% %HEIGHT%"
><path /></svg>`;

/**
 * Default template for error SVG
 */
const TPL_ERROR = `<svg xmlns="http://www.w3.org/2000/svg"
  width="%WIDTH%" height="%HEIGHT%"
  viewBox="0 0 %WIDTH% %HEIGHT%"
><g><rect width="%WIDTH%" height="%HEIGHT%" /></g></svg >`;

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  /**
   * Current template for blank SVG.
   */
  private _blankTpl = TPL_BLANK;

  /**
   * Current template for error SVG.
   */
  private _errorTpl = TPL_ERROR;

  /**
   * Fill color for error SVG
   */
  private _errorFill = '#ff0000';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  /**
   * Returns content of SVG at specified URL
   *
   * @param url     URL of the icon
   * @param opts    Additional options
   */
  get(url: string, opts?: SvgGetOptions): Observable<SafeHtml> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((result) => {
        //
        // No options. Return as-is
        //
        if (!opts) {
          return this.sanitizer.bypassSecurityTrustHtml(result);
        }

        let icon;

        //
        // Option - Scale
        //
        if (opts.scale) {
          // TODO: Optimize regex matches below
          const matchWidth = result.match(/width="(\d+)"/);
          const matchHeight = result.match(/height="(\d+)"/);

          if (matchWidth && matchHeight) {
            const width = parseInt(matchWidth[1], 10) * opts.scale;
            const height = parseInt(matchHeight[1], 10) * opts.scale;

            icon = result
              .replace(/width="\d+"/g, `width="${width}"`)
              .replace(/height="\d+"/g, `height="${height}"`);

            return this.sanitizer.bypassSecurityTrustHtml(icon);
          } else {
            return this.sanitizer.bypassSecurityTrustHtml(result);
          }
        }

        //
        // Option - Specific size
        //
        if (opts.size) {
          icon = result
            .replace(/width="\d+"/g, `width="${opts.size.width}"`)
            .replace(/height="\d+"/g, `height="${opts.size.height}"`);

          return this.sanitizer.bypassSecurityTrustHtml(icon);
        }
      }),
    );
  }

  /**
   * Returns blank SVG of specified size.
   *
   * @param width   Width of the SVG
   * @param height  Height of the SVG
   */
  getBlank(width: number, height: number): SafeHtml {
    const icon = this._blankTpl
      .replace(/%WIDTH%/g, `${width}`)
      .replace(/%HEIGHT%/g, `${height}`);

    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  /**
   * Returns error SVG of specified size.
   *
   * @param width   Width of the SVG
   * @param height  Height of the SVG
   */
  getError(width: number, height: number): SafeHtml {
    const icon = this._errorTpl
      .replace(/%WIDTH%/g, `${width}`)
      .replace(/%HEIGHT%/g, `${height}`);

    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  /**
   * Returns fill color for the error SVG.
   */
  getErrorFill(): string {
    return this._errorFill;
  }

  /**
   * Set template for error SVG.
   * In anticipation of possible checks (in future) on template string, returns a status.
   *
   * @param tpl   Template of the error SVG
   */
  setErrorTemplate(tpl: string): boolean {
    this._errorTpl = tpl;

    return true;
  }

  /**
   * Set fill color for the error SVG.
   */
  setErrorFill(arg: string): void {
    this._errorFill = arg;
  }
}
