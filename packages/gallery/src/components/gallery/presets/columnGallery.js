
import React from 'react';
import ProGallery from '../proGallery/proGallery';
import LAYOUTS from '../../../common/constants/layout';
import dimensionsHelper from '../../helpers/dimensionsHelper';

export const fixedStyles = {
  galleryLayout: LAYOUTS.COLUMN,
  //params from layoutHelper
  showArrows: true,
  cubeImages: true,
  smartCrop: false,
  cubeType: 'fill',
  cubeRatio: 0.35,
  isVertical: false,
  galleryType: 'Strips',
  groupSize: 1,
  groupTypes: '1',
  gallerySize: () => dimensionsHelper.getGalleryHeight(),
  fixedColumns: 0,
  hasThumbnails: false,
  oneRow: true,
  enableScroll: true,
  isGrid: false,
  isColumns: true,
  isMasonry: false,
  isSlider: false,
  isSlideshow: false,
  cropOnlyFill: false,
}
export default class ColumnGallery extends React.Component {

  render() {
    return (
      <ProGallery
        {...this.props}
        styles={{
          ...this.props.styles,
          ...fixedStyles
        }}
      />
    );
  }
}
