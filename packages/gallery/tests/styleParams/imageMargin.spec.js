import GalleryDriverNew from './galleryDriverNew/galleryDriver';
import { expect } from 'chai';
import { images } from '../constants/items';
import { styleParams, container } from '../constants/styles';


describe('styleParam - imageMargin', () => {

    let driver;
    const initialProps = {
        container,
        items: images,
        styles: styleParams
    }

    beforeEach(() => {
        driver = new GalleryDriverNew();
        Object.assign(initialProps.styles, {
            
        })
    });

    afterEach(() => {
        driver.detachGallery();
    })

    it('should set', () => {
        driver.mountGallery(initialProps)
    })


})