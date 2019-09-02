import React from 'react';
import CustomButtonIcon from './customButtonIcon.js';
import EVENTS from '../../../utils/constants/events';
import { GalleryComponent } from '../../galleryComponent';

export default class CustomButton extends GalleryComponent {
  render() {
    const { styleParams } = this.props;
    const defaultText = styleParams.isStoreGallery ? 'Buy Now' : 'Click here';
    const buttonText = styleParams.customButtonText || defaultText;
    return (
      <div
        className="custom-button-wrapper"
        style={{
          justifyContent: styleParams.galleryHorizontalAlign,
          zIndex: 17,
        }}
      >
        {this.props.small ? (
          <CustomButtonIcon />
        ) : (
          <button
            data-hook="custom-button-button"
            onClick={() =>
              this.props.actions.eventsListener(
                EVENTS.BUY_NOW_CLICKED,
                this.props,
              )
            }
            tabIndex={-1}
          >
            {buttonText}
            <div className="overlay" />
          </button>
        )}
      </div>
    );
  }
}
