import GalleryDriverNew from './galleryDriverNew/galleryDriver';
import { expect } from 'chai';
import { images } from '../constants/items';
import { styleParams, container } from '../constants/styles';

describe('styleParam - allowDescription', () => {

    let driver;
    const initialProps = {
        container,
        items: images,
        styles: styleParams
    }

    beforeEach(() => {
        driver = new GalleryDriverNew();
        Object.assign(initialProps.styles, {
            oneRow: false,
            scrollDirection: 0,
            numberOfImagesPerRow: 1,
            gridStyle: 1
        })
    });

    afterEach(() => {
        driver.detachGallery();
    })

    it('should set gallery as non slider vertical gallery', () => {
        driver.mountGallery(initialProps)
    });

    it('should render 2 images per row', () => {
        driver.mountGallery(initialProps)
    });

    it('should render 3 images per row', () => {
        driver.mountGallery(initialProps)
    })
})