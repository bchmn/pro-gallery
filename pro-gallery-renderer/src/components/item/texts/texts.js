import React from 'react';
import CustomButton from '../buttons/customButton.js';
import ItemTitle from './itemTitle.js';
import ItemDescription from './itemDescription.js';
import lineHeightFixer from './lineHeightFixer.js';
import Consts from 'photography-client-lib/dist/src/utils/consts';
import utils from '../../../utils';

export default class Texts extends React.Component {

  getElementClassNames() {
    const {showShare, styleParams, isNarrow} = this.props;
    const classNames = ['gallery-item-text'];
    if (showShare) {
      classNames.push('hidden');
    }
    if (styleParams.showArrows) {
      classNames.push('padded-horizontal');
    }
    if (styleParams.allowMultishare) {
      classNames.push('push-down');
    }
    if (isNarrow) {
      classNames.push('narrow-item');
    }

    return classNames.join(' ');
  }

  allowAnyAction() {
    const {styleParams} = this.props;
    return styleParams.loveButton || styleParams.allowSocial || styleParams.allowDownload;
  }

  getElementStyle() {
    const {styleParams, style} = this.props;
    const textsDisplayOnHover = !styleParams.isSlideshow && !styleParams.isSlider && !styleParams.hasThumbnails;
    const isCentered = style.justifyContent === 'center';

    const elementStyle = {
      justifyContent: styleParams.galleryVerticalAlign,
      alignItems: styleParams.galleryHorizontalAlign,
      textAlign: styleParams.galleryTextAlign,
    };

    //Set the texts fixed height considering the height of the love and share buttons which is about 100px;
    if (textsDisplayOnHover && this.allowAnyAction()) {
      elementStyle.paddingBottom = 45;
    }

    if (isCentered) {
      elementStyle.marginTop = style.height / 15;
    }

    return elementStyle;
  }

  getItemTexts() {
    const {title, description, id, styleParams, style, isSmallItem, isNarrow, shouldShowButton} = this.props;
    const shouldShowTitle = title && !isSmallItem && styleParams.allowTitle && styleParams.titlePlacement === Consts.placements.SHOW_ON_HOVER;
    const shouldShowDescription = !isSmallItem && styleParams.allowDescription && description;
    const shouldHaveBottomSpaceInTitle = shouldShowDescription || this.allowAnyAction();

    const titleElem = shouldShowTitle && <ItemTitle key={'item-title-' + id} title={title} style={shouldHaveBottomSpaceInTitle ? {} : {marginBottom: 0}} />;
    const descriptionElem = shouldShowDescription && <ItemDescription description={description} key={'item-description-' + id} />;
    const buttonElem = shouldShowButton && <CustomButton type="button" styleParams={styleParams} style={style} small={isNarrow}/>;

    const shouldHideElement = !titleElem && !descriptionElem && !buttonElem;
    if (shouldHideElement) {
      return null;
    }

    const elementStyle = this.getElementStyle();
    const classNames = this.getElementClassNames();

    return (
      <div style={elementStyle}
           ref={x => this.container = x}
           className={classNames}
           dir="auto" >
        {titleElem}
        {descriptionElem}
        {buttonElem}
      </div>
    );

  }

  tryFixLineHeight() {
    try {
      lineHeightFixer.fix(this.props, this.container);
    } catch (e) {
      if (utils.isVerbose()) {
        console.error('Error on componentDidUpdate', e);
      }
    }

  }

  componentDidUpdate() {
    this.tryFixLineHeight();
  }

  componentDidMount() {
    this.tryFixLineHeight();
  }

  render() {
    return this.getItemTexts();
  }
}