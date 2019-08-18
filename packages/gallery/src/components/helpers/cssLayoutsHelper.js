import { createLayout } from 'pro-layouts';
import { cssScrollHelper } from './cssScrollHelper.js';

// const CDN_URL = 'https://static.wixstatic.com/media/';
const desktopWidths = [480, 768, 1024, 1280, 1440, 1680, 1920, 2560];
const mobileWidths = [320]; //, 375, 414, 480, 600, 768, 900]; (mobile is currently fixed to 320px)

const getImageStyle = item => ({
  top: item.offset.top,
  left: item.offset.left,
  width: item.width,
  height: item.height,
});

const createCssFromLayouts = (layouts, styleParams, widths) => {
  const cssStrs = [];
  layouts.forEach((layout, idx) => {
    let cssStr = '';
    if (layout) {
      const width = widths[idx];
      const lastWidth = widths[idx - 1];
      const isFirstMediaQuery = !lastWidth || cssStrs.length === 0;
      cssStr += isFirstMediaQuery
        ? ''
        : `@media only screen and (min-width: ${(lastWidth * 2 + width) /
            3}px) {`;
      const layoutWidth = width - styleParams.imageMargin * 2;
      const getRelativeDimension = val =>
        Math.round(10000 * (val / layoutWidth)) / 100;
      layout.items.forEach((item, i) => {
        const id = cssScrollHelper.getDomId(item);
        if (i < 50) {
          const style = getImageStyle(item);
          const Tvw = `top:${getRelativeDimension(style.top)}vw !important;`;
          const Wvw = `width:${getRelativeDimension(
            style.width,
          )}vw !important;`;
          const Hvw = `height:${getRelativeDimension(
            style.height,
          )}vw !important;`;
          const Lpc = `left:${getRelativeDimension(style.left)}% !important;`;
          const Wpc = `width:${getRelativeDimension(style.width)}% !important;`;
          cssStr += `#${id} {${Tvw}${Lpc}${Wpc}${Hvw}}`;
          cssStr += `#${id} .gallery-item-wrapper, #${id} .gallery-item-hover, #${id} .gallery-item {${Wvw}${Hvw}}`;
        } else {
          cssStr += `#${id}{display:none;}`;
        }
      });

      cssStr += isFirstMediaQuery ? '' : `}`;
      cssStrs.push(cssStr);
    }
  });

  return cssStrs;
};

export const createCssLayouts = (layoutParams, isMobile) => {
  const widths = isMobile ? mobileWidths : desktopWidths;
  const cssLayouts = widths.map(width => {
    const _layoutParams = {
      ...layoutParams,
      ...{
        container: { ...layoutParams.container, galleryWidth: width, width },
      },
    };
    return createLayout(_layoutParams);
  });
  return createCssFromLayouts(cssLayouts, layoutParams.styleParams, widths);
};
