/**
 * Size of the SVG image
 */
export interface SvgSize {
  /**
   * Width of the SVG image
   */
  width: number;

  /**
   * Height of the SVG image
   */
  height: number;
}

/**
 * Option to get the SVG image.
 * Scaling factor, if defined, takes precedence over size.
 */
export interface SvgGetOptions {
  /**
   * Size of the image, if defined.
   */
  size?: SvgSize;

  /**
   * Scaling factor of the image, if defined.
   */
  scale?: number;
}
